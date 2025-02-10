import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonLinterService } from './json-linter.service';

@Component({
  selector: 'app-json-checker',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './json-checker.component.html',
  styleUrl: './json-checker.component.css',
})
export class JsonCheckerComponent {
  jsonInput: string = '';
  lintResult: { valid: boolean; error?: string; lineNumber?: number } | null =
    null;
  num_lines_as_arr: number[] = [];
  highlightedLine: number | null = null;

  constructor(private jsonLinterService: JsonLinterService) {}

  updateLineNumbers() {
    const numberOfLines = this.jsonInput.split('\n').length;
    this.num_lines_as_arr = Array(numberOfLines)
      .fill(0)
      .map((x, i) => i);
  }

  lintJson() {
    this.lintResult = this.jsonLinterService.lintJson(this.jsonInput);
    if (this.lintResult.valid) {
      this.jsonInput = JSON.stringify(JSON.parse(this.jsonInput), null, 2);
    }
    this.updateLineNumbers();
  }

  CollapseJson = () => {
    this.jsonInput = JSON.stringify(JSON.parse(this.jsonInput));
    this.updateLineNumbers();
  };

  syncScroll() {
    const textarea = document.querySelector('textarea');
    const lineNumbers = document.querySelector('.line-numbers');

    if (textarea && lineNumbers) {
      lineNumbers.scrollTop = textarea.scrollTop;
    }
  }

  onKeyUp(event: KeyboardEvent | MouseEvent) {
    const textarea = event.target as HTMLTextAreaElement;
    const cursorPosition = textarea.selectionStart;

    const lines = this.jsonInput.split('\n');
    let currentLine = 0;
    let charCount = 0;

    for (let i = 0; i < lines.length; i++) {
      charCount += lines[i].length + 1;
      if (charCount > cursorPosition) {
        currentLine = i;
        break;
      }
    }

    this.highlightedLine = currentLine;
  }
}
