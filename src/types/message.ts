export type MessageDeleteResponse = {
  message: string;
};

export type MessageErrorResponse = {
  message: string;
  error: string;
  statusCode: number;
};

export type MessageDeletePayload = {
  id: string;
};
