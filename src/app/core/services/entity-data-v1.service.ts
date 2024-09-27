import { HttpClient, HttpContext } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FilterParams } from "../types/filter-params.type";
import { List } from "lodash";
import { EditCreateEntityData, EntityData } from "../interfaces/entity-data.interface";
import { CreateResponse } from "../interfaces/response.interface";
import { Delete } from "../interfaces/generics/delete.interface";
import { Update } from "../interfaces/generics/update.interface";
import { DAVESA_AUTH_API } from "../auth-davesa/auth-davesa-api.interceptor";


const httpOptions = {
  context: new HttpContext().set(DAVESA_AUTH_API, true)
};



@Injectable({
  providedIn: "root",
})
export class EntityDataV1Service {
  constructor(private http: HttpClient) {}

  getEntityDataList(filterParams: FilterParams): Observable<List<EntityData>> {
    return this.http.post<List<EntityData>>("admin/entityData", filterParams, httpOptions);
  }

  addEntityData(postData: EditCreateEntityData): Observable<CreateResponse> {
    return this.http.post<CreateResponse>("admin/entityData/create", {
      name: postData.name,
      entity_id: postData.entity_id,
    }, httpOptions);
  }

  deleteEntityData(postData: EntityData): Observable<Delete<object>> {
    return this.http.delete<Delete<object>>(
      "admin/entityData/delete/" + postData.entity_id + "/" + postData.oid
      , httpOptions);
  }

  editEntityData(postData: EditCreateEntityData): Observable<Update<object>> {
    //return this.http.put("admin/entityData/update/" + postData.oid, {entity_id: postData.entity_id, name: postData.name});
    return this.http.put<Update<object>>(
      "admin/entityData/update/" + postData.oid,
      {
        name: postData.name,
      }
      , httpOptions);
  }
}
