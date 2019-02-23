import { Request } from "express";

export interface UserData {
  name: string;
  email: string;
  password: string;
  photo: string;
  id: number;
  token?: string;
}

export interface UserParamsData {
  id: number;
}

export interface UserDataRequest extends Request {
  body: UserData;
}

export interface UserParamsRequest extends Request {
  params: UserParamsData;
}

export interface ReturnData extends Response {
  // response: UserParamsData;
}
