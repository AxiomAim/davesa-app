import { HttpClient, HttpContext, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DAVESA_AUTH_API } from "../auth-davesa/auth-davesa-api.interceptor";

const { hostname } = new URL(window.location.href);
const httpOptions = {
  context: new HttpContext().set(DAVESA_AUTH_API, true)
};

@Injectable({
  providedIn: "root",
})
export class FinanceAdminService {
  constructor(private http: HttpClient) {}

  getStudyProcedure(params): Observable<any> {
    return this.http.post("finance/get-study-procedure", params, httpOptions);
  }

  updateFiananceBudgetProcedure(data: any): Observable<any> {
    return this.http.put("finance/update-finance-budget-procedure", data, httpOptions);
  }

  getTriggerEventList(): Observable<any> {
    return this.http.get("finance/list-trigger-event", httpOptions);
  }

  getFinanceTriggerEventList(params: any): Observable<any> {
    return this.http.post("finance/finance-trigger-event-list", params, httpOptions);
  }

  updateFinanceTriggerEvent(data: any): Observable<any> {
    return this.http.put("finance/finance-trigger-event-update", data, httpOptions);
  }

  createFinanceTriggerEvent(data: any): Observable<any> {
    return this.http.post("finance/finance-trigger-event-create", data, httpOptions);
  }

  deleteFinanceTriggerEvent(oid: any): Observable<any> {
    return this.http.delete("finance/finance-trigger-event-delete/" + oid, httpOptions);
  }

  getBillableItemList(data: any): Observable<any> {
    return this.http.post("finance/get-billable-items", data, httpOptions);
  }
  createFinanceInvoice(data: any): Observable<any> {
    return this.http.post("finance/create-finance-invoice", data, httpOptions);
  }
  getInvoiceList(data: any): Observable<any> {
    return this.http.post("finance/list-finance-invoice", data, httpOptions);
  }
  sendMailWithInvoice(oid: any): Observable<any> {
    return this.http.get("finance/send-mail-with-invoice/" + oid, httpOptions);
  }
  generateVisitBillableItem(data): Observable<any> {
    return this.http.post("finance/generate-visit-billable-item", data, httpOptions);
  }
  updateArchiveBillableItem(data: any): Observable<any> {
    return this.http.post("finance/update-archived-billable-item", data, httpOptions);
  }
  generateBillableItem(data): Observable<any> {
    return this.http.post("finance/generate-billable-item", data, httpOptions);
  }

  importTriggerEvents(data): Observable<any> {
    return this.http.post("finance/import-finance-trigger-event", data, httpOptions);
  }
  updateProcedureQuantity(data): Observable<any> {
    return this.http.put("finance/update-procedure-quantity", data, httpOptions);
  }

  createPaymentHistory(data): Observable<any> {
    return this.http.post("finance/create-payment-history", data, httpOptions);
  }

  PaymentHistoryList(data): Observable<any> {
    return this.http.post("finance/payment-history", data, httpOptions);
  }

  quickbookAuth(): Observable<any> {
    return this.http.get("finance/authorization-uri", httpOptions);
  }
  quickbookCallback(): Observable<any> {
    return this.http.get("finance/callback", httpOptions);
  }
  generateInvoiceInQuickbook(data): Observable<any> {
    return this.http.post(`finance/generate-invoice-in-quickbook`, data, httpOptions);
  }
  updateFinancePayee(data): Observable<any> {
    return this.http.post(`finance/update-finance-payee`, data, httpOptions);
  }
  getFinancePayee(data): Observable<any> {
    return this.http.get(`finance/get-finance-payee/${data}`, httpOptions);
  }
  uploadFinancePayeeDocument(data): Observable<any> {
    return this.http.post(`finance/upload-finance-payee-document`, data, httpOptions);
  }

  uploadFinanceInvoiceDocument(data): Observable<any> {
    return this.http.post(`finance/upload-finance-invoice-document`, data, httpOptions);
  }

  uploadDocumentInQuickbook(data): Observable<any> {
    return this.http.post(`finance/upload-document-in-quickbook`, data, httpOptions);
  }

  getOneOrganization(): Observable<any> {
    return this.http.get("finance/get-one-org", httpOptions);
  }
  getFinanceDashboard(params): Observable<any> {
    return this.http.post('finance/dashboard', params, httpOptions);
  }
  getFinanceRevenueDashboard(params): Observable<any> {
    return this.http.post('finance/dashboard-revenue', params, httpOptions);
  }

}
