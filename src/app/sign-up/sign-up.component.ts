import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  @Output() show_sign_up = new EventEmitter<boolean>();
  Emit = () => {
    console.log('run emit');
    this.show_sign_up.emit(false);
  };
}
