import { NgStyle } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-spedetypr',
  standalone: true,
  imports: [NgStyle, FormsModule],
  templateUrl: './spedetypr.component.html',
  styleUrl: './spedetypr.component.css',
})
export class SpedetyprComponent implements AfterViewInit {
  completion_percentage: number = 0;
  rocket_width: number = 0;
  answer: string = '';
  @ViewChild('rocket') element!: ElementRef;

  ngAfterViewInit() {
    const elementWidthPx = this.element.nativeElement.offsetWidth;
    const viewportWidthPx = window.innerWidth;
    this.rocket_width = (elementWidthPx / viewportWidthPx) * 100;
  }

  UpdatePercentage = () => {
    let full_width: number =
      Math.floor(this.completion_percentage) + Math.floor(this.rocket_width);
    if (full_width < 100) {
      this.completion_percentage++;
    } else {
      this.completion_percentage = 100;
    }
    console.log(full_width);
    console.log(this.completion_percentage);
  };
}
