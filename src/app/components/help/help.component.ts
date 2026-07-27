import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { environment } from '../../../environments/environment.development';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [RouterLink, RecaptchaModule, ReactiveFormsModule],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {
  private fb = inject(FormBuilder);
  //phoneNumber: string = '';
  readonly recaptchaSiteKey = environment.recaptchaSiteKey;
  captchaToken = signal<string | null>(null);

  form = this.fb.group({
    fullName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    message: ['', Validators.required]
  });


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
    //this.phoneNumber = formatted;
    this.form.get('phone')?.setValue(formatted, { emitEvent: false });
  }

  onCaptchaResolved(token: string | null): void {
    this.captchaToken.set(token);
  }

  onCaptchaExpired(): void {
    this.captchaToken.set(null);
  }

  onSubmit(): void {
    if (this.form.invalid || !this.captchaToken()) {
      this.form.markAllAsTouched();
      return;
    }
  }
}
