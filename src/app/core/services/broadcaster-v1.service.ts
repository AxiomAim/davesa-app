import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { VisitStatus } from "../enum/visit-status.enum";
import { Members } from "../interfaces/google-group.interface";

const TABLEFILTERS = "tableFilters";

@Injectable({
  providedIn: "root",
})
export class BroadcasterV1Service {
  public readonly spinnerSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public readonly moduleSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public readonly isProcedureActive: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  public studyPath: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public isStudySelected: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public studyId: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
  public isDelegationRoleAccept: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public subjectVisitOid: BehaviorSubject<string> = new BehaviorSubject<string>(
    ""
  );
  public googleGroupMembers: BehaviorSubject<Members> = new BehaviorSubject<Members>(null);
  constructor() {}

  spinner(value) {
    this.spinnerSubject.next(value);
  }

  addGoogleGroupMembers(value) { 
    this.googleGroupMembers.next(value);
   }

  changeBooleanValueOfProcedure(value) {
    this.isProcedureActive.next(value);
  }

  changePathOfStudy(value) {
    this.studyPath.next(value);
  }

  AcceptDelegationRole(value) {
    this.isDelegationRoleAccept.next(value);
  }

  setSubjectVisitOid(value) {
    this.subjectVisitOid.next(value);
  }

  changeStudyId(value) {
    this.studyId.next(value);
  }

  getStatusColor(status: string) {
    switch (status) {
      case VisitStatus.SCHEDULE:
        return "bg-indigo-white";
      case VisitStatus.CONFIRMED:
        return "bg-blue-grass";
      case VisitStatus.MISSED:
        return "bg-re-entry-red";
      case VisitStatus.FINISHED:
        return "bg-highlighter-green";
      case VisitStatus.VALIDATED:
        return "bg-emrald-green";
      case VisitStatus.RESCHEDULE:
        return "bg-light-brown";
      case VisitStatus.UNCONFIRMED:
        return "bg-breeze-blue";
      case VisitStatus.MONITOR:
        return "bg-dark-green";
      case VisitStatus.CLINIC:
        return "bg-fish-boy";
      case VisitStatus.REVIEW:
        return "bg-aqua-green";
      case VisitStatus.ENDORSED:
        return "bg-parsley-green";
      case VisitStatus.ABSENT:
        return "bg-beluga";
      default:
        break;
    }
  }

  // set user filter preffrence in local storage
  setTableFilters(filter: object, componentName: string) {
    let storedFilters: object = localStorage.getItem(TABLEFILTERS)
      ? JSON.parse(localStorage.getItem(TABLEFILTERS))
      : localStorage.getItem(TABLEFILTERS);
    if (storedFilters) {
      storedFilters[componentName] = filter;
      localStorage.setItem(TABLEFILTERS, JSON.stringify(storedFilters));
    } else {
      let newFilters = {};
      newFilters[componentName] = filter;
      localStorage.setItem(TABLEFILTERS, JSON.stringify(newFilters));
    }
  }

  // get user filter preffrence in local storage
  getTableFilters(componentName: string) {
    let storedFilters: object = localStorage.getItem(TABLEFILTERS)
      ? JSON.parse(localStorage.getItem(TABLEFILTERS))
      : localStorage.getItem(TABLEFILTERS);

    if (storedFilters) {
      return storedFilters[componentName];
    } else {
      return null;
    }
  }

  // remove user filter preffrence in local storage
  removeTableFilters() {
    localStorage.setItem(TABLEFILTERS, "");
  }
}
