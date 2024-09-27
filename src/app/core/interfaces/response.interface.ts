export interface Response {
  data: Object;
  message: string;
  error?: string;
}

export interface CreateResponse {
  data: {
    oid: string;
  };
  message: string;
}