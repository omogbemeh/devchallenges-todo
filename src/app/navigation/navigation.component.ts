import { Component, OnInit } from '@angular/core';
import { PostService } from '../post-service/post.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  showCompleted = false;
  showActive = false;
  showAll = true;
  posts: any[];
  activePosts: any[];
  completedPosts: any[];

  constructor(public service: PostService) {
    this.posts = [];
    this.activePosts = [];
    this.completedPosts = [];
  }
  ngOnInit() {
    this.getPosts();
  }
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
  submitPost(input: HTMLInputElement, event: any) {
    event.preventDefault();
    let id = this.uuidv4();
    let postData = {
      id,
      title: input.value,
      isActive: true,
      isChecked: false,
    };
    this.posts = this.service.createPost(postData);
    this.activePosts = this.posts.filter((post) => post.isActive === true);
    input.value = '';
  }
  filterActive() {
    this.showCompleted = false;
    this.showActive = true;
    this.showAll = false;
    this.activePosts = this.posts.filter((post) => post.isActive === true);
  }
  displayAll() {
    this.showCompleted = false;
    this.showAll = true;
    this.showActive = false;
  }
  filterCompleted() {
    this.showActive = false;
    this.showAll = false;
    this.showCompleted = true;
    this.completedPosts = this.posts.filter((item) => {
      if (item.isActive !== true) return item;
    });
  }
  isClicked(appPost: any) {
    appPost.isActive = !appPost.isActive;
    appPost.isChecked = !appPost.isChecked;
  }
  getPosts() {
    this.posts = this.service.getPosts();
  }
  deleteTask(id: number) {
    this.completedPosts = this.completedPosts.filter((post) => {
      if (post.id !== id) return post;
    });
    this.posts = this.posts.filter((post) => {
      if (post.id !== id) return post;
    });
    this.service.deletePost(id);
  }
  deleteAll() {
    this.completedPosts = this.completedPosts.filter((post) => {
      if (post.isActive === true) {
        return post;
      }
    });
    this.posts = this.posts.filter((post) => {
      if (post.isActive !== true) {
        return this.service.deletePost(post.id);
      } else return post;
    });
    console.log(this.posts);
  }

  onChange(e: any, appPost: any) {
    const event = e?.checked;
    if (event) {
      this.service.updatePost(appPost.id, false);
    } else {
      this.service.updatePost(appPost.id, true);
    }
  }
}
