import { Router } from "@angular/router";
export class fileViewerFunction {
  static fileViewer(url,router?: Router){
      console.log("PDF URL",url)
        if(url){
          
            const fileName = url.match(/\/([^/]+\.[^/]+)$/)[1]; // text after last '/'
            console.log("fileName",fileName)
            let documentUrl = url;
            if (fileName.endsWith(".pdf")) {
            //  let path = router.serializeUrl(
            //     router.createUrlTree(["/pdf-viewer"])
            //   );
            //   var newWindow = window.open(path, "_blank");
            //   newWindow["pdfUrl"] = documentUrl;
            window.open(documentUrl,"_blank");
            }else if(this.isImage(fileName)){
              let path = router.serializeUrl(
                router.createUrlTree(["/image-viewer"])
              );
              var newWindow = window.open(path, "_blank");
              newWindow["imageUrl"] = documentUrl;
            }else{
              window.open(documentUrl,"_blank");
            }
          }
    }
  static isImage(fileName: string) {
        switch (true) {
          case fileName.endsWith(".png"):
          case fileName.endsWith(".jpg"):
          case fileName.endsWith(".jpeg"):
            return true;
          default:
            return false;
        }
      }
   
}

