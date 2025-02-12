import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTime } from 'luxon';
import { CreatePostComponent } from '../create-post/create-post.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-oh-crud',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    SignUpComponent,
    CreatePostComponent,
  ],
  templateUrl: './oh-crud.component.html',
  styleUrl: './oh-crud.component.css',
})
export class OhCrudComponent implements OnInit {
  constructor(private http: HttpClient) {}
  private url = 'http://localhost:999';

  ngOnInit(): void {
    this.GetUsers();
    this.GetPosts();
    this.CheckSignUp();
  }

  // @Output() show_sign_up = new EventEmitter<boolean>();
  test_users: User[] = [];
  posts: crud[] = [];
  show_sign_up: boolean = false;

  GetUsers = () => {
    this.http.get<User[]>(`${this.url}/users`).subscribe((res) => {
      this.test_users = res;
    });
  };

  GetPosts = () => {
    this.http.get<crud[]>(`${this.url}/posts`).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        res[i].post_date = DateTime.fromISO(String(res[i].post_date));
      }
      this.posts = res;
    });
  };

  CheckSignUp = () => {
    // check if signed up / am i doing anon / ip ?
    setTimeout(() => {
      this.show_sign_up = true;
    }, 50);
    // }, 5000);
  };
}

interface User {
  name: string;
  img: string;
}

interface crud {
  title: string;
  body: string;
  creator: User;
  post_date: DateTime;
  num_comments: number;
  num_shares: number;
  num_likes: number;
}
