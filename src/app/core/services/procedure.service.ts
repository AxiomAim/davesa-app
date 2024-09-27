import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProcedureService {
  private _procedureInfo = new BehaviorSubject<any>(null);

  constructor() {}

  getProcedureInfo() {
    return this._procedureInfo.asObservable();
  }

  setProcedureInfo(procedureInfo) {
    this._procedureInfo.next(procedureInfo);
  }
}
