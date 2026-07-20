import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {
  phoneNumber: string = '';

  onPhoneInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let input = inputElement.value;

    let cleaned = input.replace(/(?!^\+)[^\d]/g, '');

    let formatted = '';

    if (cleaned.startsWith('+90')) {
      const rest = cleaned.substring(3);
      formatted = '+90';
      if (rest.length > 0) formatted += ' ' + rest.substring(0, 3);
      if (rest.length > 3) formatted += ' ' + rest.substring(3, 6);
      if (rest.length > 6) formatted += ' ' + rest.substring(6, 8);
      if (rest.length > 8) formatted += ' ' + rest.substring(8, 10);

    } else if (cleaned.startsWith('05')) {
      formatted = cleaned.substring(0, 4);
      if (cleaned.length > 4) formatted += ' ' + cleaned.substring(4, 7);
      if (cleaned.length > 7) formatted += ' ' + cleaned.substring(7, 9);
      if (cleaned.length > 9) formatted += ' ' + cleaned.substring(9, 11);

    } else if (cleaned.startsWith('5')) {
      formatted = cleaned.substring(0, 3);
      if (cleaned.length > 3) formatted += ' ' + cleaned.substring(3, 6);
      if (cleaned.length > 6) formatted += ' ' + cleaned.substring(6, 8);
      if (cleaned.length > 8) formatted += ' ' + cleaned.substring(8, 10);

    } else {
      formatted = cleaned.substring(0, 11);
    }

    inputElement.value = formatted;
    this.phoneNumber = formatted;
  }
}
