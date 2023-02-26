export interface IUser {
  email: string;
  name: string;
}

export interface IRegister {
  email: string;
  name: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface INewPasswordRequest {
  token: string;
  password: string;
}

export interface IChangeInfo {
  email: string;
  name: string;
  password: string;
}
