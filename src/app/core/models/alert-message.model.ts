export type AlertMessageStyle = 
| 'border' 
| 'fill' 
| 'outline' 
| 'soft'
;

export type AlertMessageType =
| 'primary'
| 'accent'
| 'warn'
| 'basic'
| 'info'
| 'success'
| 'warning'
| 'error';

export type AlertMessage = {
  text: string;
  type: AlertMessageType;  
  // showIcon:string;
  // text: string;
}

