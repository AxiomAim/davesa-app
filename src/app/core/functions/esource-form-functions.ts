import moment from 'moment';
import { SubjectManagerV2Service } from 'app/core/services/subject-manager-v2.service';
import { FileUploadType } from 'app/core//enum/fileUploadType.enum';

export class EsourceFunctions {
  constructor(public _subjectManagerV1Service: SubjectManagerV2Service) {}
  FileUploadType = FileUploadType;
  fileUploadStatusArray = [];
  currentSubjectEsourceFormOid: string = '';
  subjectOid: string = '';
  async formateFileUploadData(data, subjectOid, currentSubjectEsourceFormOid) {
    this.currentSubjectEsourceFormOid = currentSubjectEsourceFormOid;
    this.subjectOid = subjectOid;
    let temporary = [];
    Object.entries(data?.form_data).forEach(([sectionKey, data]) => {
      if (typeof data === 'object' && data) {
        if (data['fileData'] || data['fileUploadType'] === FileUploadType.LAB_RESULT) {
          temporary.push({ ...data, field_name: sectionKey });
          // temporary.push(data['fileData']);
        } else {
          // console.log('data', data);
          for (let [fieldKey, val] of Object.entries(data)) {
            // console.log(fieldKey, val);
            if (
              val &&
              typeof val === 'object' &&
              (val['fileData'] || val['fileUploadType'] === FileUploadType.LAB_RESULT)
            ) {
              // console.log({ val });
              temporary.push({
                ...val,
                section_name: sectionKey,
                field_name: fieldKey,
              });
              // temporary.push(val['fileData']);
            } else if (data['fileUploadType'] === FileUploadType.LAB_RESULT) {
              temporary.push({
                ...val,
                section_name: sectionKey,
                field_name: fieldKey,
              });
            }
          }
        }
      }
    });
    // console.log({ temporary });

    let formatedData = [];

    for (const files of temporary) {
      await new Promise((resolve) => this.uploadEsourceDocuments(resolve, files))
        .then((res) => formatedData.push(res))
        .catch((err) => (formatedData = []));
    }

    if (temporary.length) {
      Object.entries(data?.form_data).forEach(async ([_, data]) => {
        if (typeof data === 'object' && data['fileData']) {
          if (data['fileData']) {
            let arr;
            arr = formatedData.length ? formatedData[0] : [];
            formatedData.splice(0, 1);
            let ans = arr?.length ? arr.filter((temp) => !temp['deleteFile'] && temp) : [];
            data['fileData'] = ans;
          }
        } else {
          let fileNameExists = Object.keys(data).includes('fileName');
          if (fileNameExists && !data['fileName']) {
            formatedData.splice(0, 1);
          }
          for (let [_, val] of Object.entries(data)) {
            if (val && typeof val === 'object') {
              let arr;
              arr = formatedData.length ? formatedData[0] : [];
              formatedData.splice(0, 1);
              let ans = arr?.length ? arr.filter((temp) => !temp['deleteFile'] && temp) : [];
              val['fileData'] = ans;
            }
          }
        }
      });
    }
    return { fileUploadStatusArray: this.fileUploadStatusArray, data };
  }
  async uploadEsourceDocuments(resolve, fileDetails) {
    let file = fileDetails.fileData;
    var formData: any = new FormData();
    let noFilesPresent = true;
    let deleteFiles = [];

    if (file) {
      for (var i = 0; i < file.length; i++) {
        if (file[i].file?.data && !file[i].deleteFile) {
          const files = file[i].file;
          formData.append('documents', files);
          noFilesPresent = false;
        }
        if (file[i].deleteFile) {
          deleteFiles.push(file[i]);
        }
      }
      if (deleteFiles.length) {
        if (file.length === deleteFiles.length) {
          if (
            fileDetails.fileUploadType === FileUploadType.LAB_RESULT &&
            fileDetails.procedureDate &&
            moment().isSameOrAfter(fileDetails.procedureDate, 'day')
          ) {
            this.fileUploadStatusArray.push({
              status: 'pending',
              type: FileUploadType.LAB_RESULT,
              procedure_date: fileDetails.procedureDate,
              section_name: fileDetails?.section_name ? fileDetails.section_name : null,
              field_name: fileDetails.field_name,
              date_of_result: fileDetails?.dateOfResult ? fileDetails.dateOfResult : null,
              subject_esource_form_oid: this.currentSubjectEsourceFormOid ? this.currentSubjectEsourceFormOid : null,
            });
          }
        }
        await Promise.all(
          deleteFiles.map(async (deleteFiles) => {
            await this.deleteEsourceFile(deleteFiles);
          })
        );
      } else {
        if (
          fileDetails.fileUploadType === FileUploadType.LAB_RESULT &&
          fileDetails.procedureDate &&
          moment().isSameOrAfter(fileDetails.procedureDate, 'day')
        ) {
          this.fileUploadStatusArray.push({
            status: file && file?.length ? 'received' : 'pending',
            type: FileUploadType.LAB_RESULT,
            procedure_date: fileDetails?.procedureDate,
            section_name: fileDetails?.section_name ? fileDetails.section_name : null,
            field_name: fileDetails.field_name,
            date_of_result: fileDetails?.dateOfResult ? fileDetails.dateOfResult : null,
            subject_esource_form_oid: this.currentSubjectEsourceFormOid ? this.currentSubjectEsourceFormOid : null,
          });
        }
      }
      if (noFilesPresent) {
        return resolve(
          file.map((fileData) => {
            return {
              file: {
                name: fileData.file.name,
                size: fileData.file.size,
              },
              ...fileData,
            };
          })
        );
      }
      formData.append('body', JSON.stringify({ subject_oid: this.subjectOid }));
      this._subjectManagerV1Service.uploadEsourceDocument(formData).subscribe((resData) => {
        return resolve(
          file.map((fileData) => {
            return {
              file: {
                name: fileData.file.name,
                size: fileData.file.size,
              },
              fileUrl: resData['data']?.find((uploadData) => uploadData.name === fileData.file.name)?.url ? resData['data']?.find((uploadData) => uploadData.name === fileData.file.name)?.url : fileData.fileUrl,
              deleteFile: fileData.deleteFile,
            };
          })
        );
      });
    } else {
      if (
        fileDetails.fileUploadType === FileUploadType.LAB_RESULT &&
        fileDetails.procedureDate &&
        moment().isSameOrAfter(fileDetails.procedureDate, 'day')
      ) {
        this.fileUploadStatusArray.push({
          status: file && file?.length ? 'received' : 'pending',
          type: FileUploadType.LAB_RESULT,
          procedure_date: fileDetails?.procedureDate,

          section_name: fileDetails?.section_name ? fileDetails.section_name : null,
          field_name: fileDetails.field_name,
          date_of_result: fileDetails?.dateOfResult ? fileDetails.dateOfResult : null,
          subject_esource_form_oid: this.currentSubjectEsourceFormOid ? this.currentSubjectEsourceFormOid : null,
        });
      }
      return resolve([]);
    }
  }

  async deleteEsourceFile(file) {
    return new Promise((resolve) => {
      this._subjectManagerV1Service
        .deleteEsourceDocument({
          fileUrl: file?.fileUrl,
          subject_oid: this.subjectOid,
        })
        .subscribe((res) => {
          res && resolve(true);
        });
    });
  }
}
