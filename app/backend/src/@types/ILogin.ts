export interface ILoginData {
  email: string,
  password: string,
}

export interface IUserDataForToken {
  id: number,
  username: string,
  role: string,
  email: string,
}

export interface IUserDataFromDatabase extends IUserDataForToken {
  password: string;
}
