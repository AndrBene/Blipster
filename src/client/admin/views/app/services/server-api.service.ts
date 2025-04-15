import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { User } from '../models/user';

export class ServerApiService {
  private httpClient = inject(HttpClient);
  private url = 'http://localhost:3000/api/v1/';

  constructor() {}

  loadUsers(period: number) {
    return this.httpClient.get<UsersResponse>(
      this.url + `users?period=${period}`,
      { withCredentials: true },
    );
  }

  loadPosts(period: number) {
    return this.httpClient.get<PostsResponse>(
      this.url + `posts?period=${period}`,
    );
  }

  loadComments(period: number) {
    return this.httpClient.get<CommentsResponse>(
      this.url + `comments?period=${period}`,
    );
  }

  loadViews(period: number) {
    return this.httpClient.get<PostsResponse>(
      this.url + `posts/views?period=${period}`,
    );
  }

  uploadAdminProfilePhoto(id: string, data: FormData) {
    return this.httpClient.patch<UserResponse>(
      this.url + `users/${id}/profile-image`,
      data,
      { withCredentials: true },
    );
  }
}

interface UserResponse {
  status: string;
  data: User;
}

interface PostsResponse {
  data: {
    blogPosts: any[];
  };
  results: number;
  status: string;
}

interface CommentsResponse {
  data: {
    comments: any[];
  };
  results: number;
  status: string;
}

interface UsersResponse {
  data: {
    users: any[];
  };
  results: number;
  status: string;
}
