import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PostService {
  constructor(private http: HttpClient) {
    this.posts = [];
  }
  posts: any[];

  getPosts() {
    this.posts = JSON.parse(localStorage.getItem('posts')!) || [];
    return this.posts;
  }

  createPost(post: object) {
    this.posts?.unshift(post);
    localStorage.setItem('posts', JSON.stringify(this.posts));
    return this.posts;
  }

  updatePost(id: string, completed: boolean) {
    this.posts = JSON.parse(localStorage.getItem('posts')!) || [];
    this.posts = this.posts.map((item) => {
      if (item.id === id)
        return { ...item, isActive: completed, isChecked: !completed };
      else return item;
    });
    console.log(this.posts);
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }

  deletePost(id: number) {
    this.posts = this.posts.filter((post) => {
      if (post.id !== id) return post;
    });
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }
}
