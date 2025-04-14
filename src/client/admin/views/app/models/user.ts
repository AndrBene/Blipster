export class User {
  constructor(
    public _id: string,
    public username: string,
    public email: string,
    public role: string,
    public photo: string,
    public createdAt: string,
  ) {}
}
