export class UserInfo {
  constructor(
    public status: string,
    public authenticated: boolean,
    public data: {
      user: {
        _id: string;
        username: string;
        email: string;
        role: string;
        photo: string;
        createdAt: string;
      };
    },
  ) {}
}
