import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-oh-crud',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './oh-crud.component.html',
  styleUrl: './oh-crud.component.css',
})
export class OhCrudComponent implements OnInit {
  constructor(private http: HttpClient) {}
  private url = 'http://localhost:999';

  ngOnInit(): void {
    this.GetUsers();
    this.GetPosts();
  }

  test_users: User[] = [];
  posts: crud[] = [];

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
