import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JsonLinterService {
  lintJson(jsonString: string): {
    valid: boolean;
    error?: string;
    lineNumber?: number;
  } {
    try {
      JSON.parse(jsonString);
      return { valid: true };
    } catch (error: any) {
      const errorMessage = error.message;

      const lineNumber = this.extractLineNumber(errorMessage, jsonString);

      return {
        valid: false,
        error: errorMessage,
        lineNumber: lineNumber,
      };
    }
  }

  private extractLineNumber(
    errorMessage: string,
    jsonString: string
  ): number | undefined {
    const lines = jsonString.split('\n');

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      try {
        JSON.parse(lines.slice(0, lineIndex + 1).join('\n') + '}');
      } catch (e: any) {
        if (e.message === errorMessage) {
          return lineIndex + 1;
        }
      }
    }

    return undefined; // Line number not found
  }
}
