import AxiosClient from 'src/app/AxiosClient';
import { Post } from 'src/types';

export default class Users {

  public static async getAllPosts() {
    return await AxiosClient.get<Post[]>('posts');
  }

  public static async getPost(id: string | number) {
    return await AxiosClient.get<Post>(`posts/${id}`);
  }

  public static async createPost(data: Post) {
    await AxiosClient.post<Post, unknown>('posts', data);
  }

  public static async updatePost(id: number | string, data: Post) {
    return await AxiosClient.put<Post, string>(`posts/${id}`, data);
  }

  public static async deletePost(id: number | string) {
    return await AxiosClient.delete<{message:string}>(`posts/${id}`);
  }
}

