export interface UserData {
  name: string;
  email: string;
  password: string;
  photo: string;
  id: number;
  token: string;
}

export interface UserDataRequest {
  body: UserData;
}
