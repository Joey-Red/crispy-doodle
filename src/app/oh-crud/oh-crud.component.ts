import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-oh-crud',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './oh-crud.component.html',
  styleUrl: './oh-crud.component.css',
})
export class OhCrudComponent {
  test_users: User[] = [
    {
      name: 'gary',
      img: 'https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww',
    },
    {
      name: 'erica',
      img: 'https://images.unsplash.com/file-1722962837469-d5d3a3dee0c7image?w=416&dpr=2&auto=format&fit=crop&q=60',
    },
    {
      name: 'angela',
      img: 'https://images.unsplash.com/photo-1445053023192-8d45cb66099d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww',
    },
    {
      name: 'josh',
      img: 'https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww',
    },
    {
      name: 'tom',
      img: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
    },
  ];

  posts: crud[] = [
    {
      title: 'lorem',
      body: 'lorem ipsum dolor sit',
      creator: this.test_users[0],
      post_date: DateTime.now().minus({ days: 89 }),
    },
    {
      title: 'lorem ipsum',
      body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      creator: this.test_users[1],
      post_date: DateTime.now().minus({ days: 37 }),
    },
    {
      title: 'dolor sit',
      body: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      creator: this.test_users[2],
      post_date: DateTime.now().minus({ days: 7 }),
    },
    {
      title: 'justo faucibus',
      body: 'in nisi metus. Faucibus mus urna elit ante magna fames. Sagittis lectus fringilla; id fames ut mauris. Taciti at taciti placerat ridiculus tortor. Sapien dapibus vulputate vehicula et nibh penatibus; urna tempus. Senectus dictum fusce tellus justo faucibus.',
      creator: this.test_users[3],
      post_date: DateTime.now().minus({ days: 700 }),
    },
    {
      title: 'Nec penatibus',
      body: 'Facilisis erat primis feugiat facilisis montes felis in viverra nisi.',
      creator: this.test_users[4],
      post_date: DateTime.now(),
    },
  ];
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
}
