import {Injectable, signal} from "@angular/core";
import {AlertMessage, AlertMessageStyle, AlertMessageType} from "app/core/models/alert-message.model";

@Injectable({
  providedIn: 'root'
})
export class AlertMessagesService {

  #alertMessageSignal = signal<AlertMessage | null>(null);

  alertMessage = this.#alertMessageSignal.asReadonly();

  showMessage( text: string, type: AlertMessageType) {
    this.#alertMessageSignal.set({
      text,
      type, 
    })
  }

  clear() {
    this.#alertMessageSignal.set(null);
  }

}
