import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FilterParams } from "../types/filter-params.type";
import { List } from "lodash";

@Injectable({
  providedIn: "root",
})
export class CredentialService {
  constructor(private http: HttpClient) {}

  getCredentialList(filterParams: FilterParams): Observable<List<Credential>> {
    return this.http.post<List<Credential>>("admin/credential", filterParams);
  }

  editCredential(credential: Credential) {
    return this.http.put("admin/credential/update", credential);
  }

  addCredential(credential: Credential) {
    return this.http.post("admin/credential/create", credential);
  }

  deleteCredential(oid) {
    return this.http.delete("admin/credential/delete/" + oid);
  }

  getCredentialByUser() {
    return this.http.get("study/study-task/get-credential-assigned-user");
  }
}
