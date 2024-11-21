import { NgClass, NgStyle } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { list } from './list';

@Component({
  selector: 'app-spedetypr',
  standalone: true,
  imports: [NgClass, NgStyle, FormsModule],
  templateUrl: './spedetypr.component.html',
  styleUrl: './spedetypr.component.css',
})
export class SpedetyprComponent implements AfterViewInit, OnInit {
  completion_percentage: number = 0;
  rocket_width: number = 0;
  answer: string = '';

  @ViewChild('rocket') element!: ElementRef;
  @ViewChild('rocketcontainer') rocketcontainer!: ElementRef;
  chosen_sentence: string = '';
  sentences: string[] = list;
  score: number = 0;
  GameOver: boolean = false;
  begin: boolean = false;
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const elementWidthPx = this.element.nativeElement.offsetWidth;
    const viewportWidthPx = window.innerWidth;
    this.rocket_width = (elementWidthPx / viewportWidthPx) * 100;
    this.CreateStars();
  }

  ngOnInit() {
    this.Reset();
  }

  CreateStars = () => {
    let vw = window.innerWidth;
    for (let i = 0; i < 25; i++) {
      const star = this.renderer.createElement('img');
      this.renderer.setAttribute(star, 'src', './assets/star.svg');
      this.renderer.setAttribute(star, 'class', 'star');
      let top: number = Math.random() * 100;
      let left: number = Math.random() * vw + 1;
      let height: number = Math.random() * 20 + 1;
      this.renderer.setStyle(star, 'top', `${top}px`);
      this.renderer.setStyle(star, 'left', `${left}px`);
      this.renderer.setStyle(star, 'height', `${height}px`);
      this.renderer.appendChild(this.rocketcontainer.nativeElement, star);
    }
  };

  GetSentence = () => {
    const chosen =
      this.sentences[Math.floor(Math.random() * this.sentences.length)];
    return chosen;
  };

  UpdatePercentage = () => {
    this.CheckScore();
    let comp: number = 0;
    for (let i = 0; i < this.chosen_sentence.length; i++) {
      if (this.chosen_sentence[i] === this.answer[i]) {
        comp++;
      }
    }
    this.completion_percentage =
      (comp / this.chosen_sentence.length) * (100 - this.rocket_width);
    if (
      this.completion_percentage === 100 ||
      this.answer.length >= this.chosen_sentence.length
    ) {
      this.GameOver = true;
    }
  };

  CheckScore = () => {
    let correct_letters: number = 0;
    for (let i = 0; i < this.chosen_sentence.length; i++) {
      if (this.chosen_sentence[i] === this.answer[i]) {
        //correct letter
        correct_letters++;
      }
    }
    this.score = Number(correct_letters / this.chosen_sentence.length) * 100;
  };

  Reset = (begin?: boolean) => {
    this.chosen_sentence = this.GetSentence();
    this.completion_percentage = 0;
    this.rocket_width = 0;
    this.answer = '';
    this.GameOver = false;
    this.score = 0;
    if (begin) {
      this.begin = true;
    } else {
      this.begin = false;
    }
  };
}
