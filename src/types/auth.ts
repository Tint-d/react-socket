export type SignInResponse = {
  accessToken: string;
  success: boolean;
  message: string;
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  username: string;
  email: string;
  password: string;
  role: string;
};

export type SignInErrorResponse = {
  message: string;
  error: string;
  statusCode: number;
};

export type SignUpErrorResponse = {
  message: string;
  error: string;
  statusCode: number;
};

export interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}
