import { User } from './user';

export class UserInfo {
  constructor(
    public status: string,
    public authenticated: boolean,
    public data: {
      user: User;
    },
  ) {}
}
