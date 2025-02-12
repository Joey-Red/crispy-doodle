import { Component } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  todays_date = DateTime.now().toFormat('yyyy LLL dd');
}
