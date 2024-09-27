import { HttpClient, HttpContext } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { io, Socket } from "socket.io-client";
import { BroadcasterV1Service } from "./broadcaster-v1.service";
import { environment } from "environments/environment";
import { AuthDavesaApiService } from "../auth-davesa/auth-davesa-api.service";
import { DAVESA_AUTH_API } from "../auth-davesa/auth-davesa-api.interceptor";

const httpOptions = {
  context: new HttpContext().set(DAVESA_AUTH_API, true)
};

@Injectable({
  providedIn: "root",
})
export class GlobalSocketV1Service {
  socket: Socket;
  GLOBAL_SOCKET_URL = environment.GLOBAL_SOCKET_URL;

  public getGlobalNotification$: Subject<any> = new Subject();
  public quickbookAuthDialogClose$: Subject<any> = new Subject();
  private _authDavesaApiService = inject(AuthDavesaApiService);
  private _broadcasterService = inject(BroadcasterV1Service);

  constructor(
    private http: HttpClient,
  ) {
    this._authDavesaApiService.loadFromStorage();
  }

  //Global nsp for managing 3 types of notfication  1) Assign DOA  , 2) eSource Form Status (review,approve),  3) Chat query status (review ,approve)  ;

  connectSocket = () => {
    this.socket = io(this.GLOBAL_SOCKET_URL, {
      transports: ["websocket"],
      reconnectionDelayMax: 10000,
      auth: {
        token: this._authDavesaApiService.token(),
        domain:this._authDavesaApiService.orgDomain(),
      },
    });
    this.socket?.on("connect", () => {
      console.log("global socket is connected successfully");
    });

    this.socket?.on("error", (error) => {
      console.log(`error, ${error}`);
    });

    this.socket?.on("reconnect", (attempt) => {
      console.log(`attempt, ${attempt}`);
    });

    this.socket?.on("connect_error", (error) => {
      console.log(`attempt, ${error}`);
    });

    this.socket?.on("connect_error", (error) => {
      console.log(`attempt, ${error}`);
    });

    this.socket?.on("get-notification", (response, error) => {
      this.getGlobalNotification$.next(response);
    });

    this.socket?.on("quickbook-close-dialog", (response, error) => {
      this.quickbookAuthDialogClose$.next(response);
    });
  };

  sendGlobalNotification(payload) {
    this.socket?.emit("send-notification", payload);
  }

  getAllNotifications(params) {
    return this.http.post("notification", {
        params,
        ...httpOptions
      }
    );
  }

  disconnectSocket = () => {
    this.socket?.disconnect();
  };
}
