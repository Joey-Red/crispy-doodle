import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent implements OnInit {
  ngOnInit(): void {
    this.IncreasePc();
  }
  percentage: number = 0;
  IncreasePc = () => {
    let pcinterval = setInterval(() => {
      let random_num = Math.floor(Math.random() * 10) + 1;
      if (this.percentage + random_num <= 100) {
        this.percentage = this.percentage + random_num;
      } else {
        this.percentage = 100;
      }
    }, 1200);
    if (this.percentage === 100) {
      clearInterval(pcinterval);
    }
  };
}
