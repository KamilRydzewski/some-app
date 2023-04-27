import PostsApi from 'src/app/Posts';
import { Post } from 'src/types';
import { computed, ComputedRef, ref } from 'vue';

const Posts = ref<Post[]>([]);
export interface UsePosts {
  posts: ComputedRef<Post[]>;
  createNewPost: (data: Post) => Promise<void>;
  deletePost: (id: number) => Promise<{message: string}>;
  getPost: (id: number) => Promise<Post>;
  getAllPosts: () => Promise<Post[]>;
  updatePost: (id: number, data: Post) => Promise<string>;
}

export const usePosts = (): UsePosts => {
  const createNewPost = async (data: Post) => {
    try {
      return PostsApi.createPost(data);
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  };

  const updatePost = async (id = 0, data: Post) => {
    try {
      return PostsApi.updatePost(id, data);
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  };

  const deletePost = async (id: number) => {
    try {
      return PostsApi.deletePost(id)
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  };

  const getPost = async (id: number) => {
    try {
      return await PostsApi.getPost(id);
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  };

  const getAllPosts = async () => {
    try {
      const resp = await PostsApi.getAllPosts();
      Posts.value = Array.isArray(resp) ? resp : [];
      return resp; 
    } catch (error) {
      console.log(error);
      return Promise.reject();
    }
  };



  return {
    createNewPost,
    deletePost,
    getPost,
    getAllPosts,
    updatePost,
    posts: computed<Post[]>(() => Posts.value)
  };
};
