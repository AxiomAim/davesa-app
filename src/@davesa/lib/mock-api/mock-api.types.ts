import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export type DavesaMockApiReplyCallback =
    | ((data: {
          request: HttpRequest<any>;
          urlParams: { [key: string]: string };
      }) => [number, string | any] | Observable<any>)
    | undefined;

export type DavesaMockApiMethods =
    | 'get'
    | 'post'
    | 'patch'
    | 'delete'
    | 'put'
    | 'head'
    | 'jsonp'
    | 'options';
