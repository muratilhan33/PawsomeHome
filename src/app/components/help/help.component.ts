import { Component, inject, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { environment } from '../../../environments/environment.development';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { fileListValidator } from '@shared/validators/file-validators';
import { NgFor, NgIf } from '@angular/common';
import { FaqItem } from '@shared/components/faq/faq-items.model';
import { FaqComponent } from "@shared/components/faq/faq.component";

interface PhotoPreview {
  file: File;
  url: string;
}

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [RouterLink, RecaptchaModule, ReactiveFormsModule, NgIf, NgFor, FaqComponent],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})

export class HelpComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  photoPreviews: PhotoPreview[] = [];
  //phoneNumber: string = '';
  readonly recaptchaSiteKey = environment.recaptchaSiteKey;
  captchaToken = signal<string | null>(null);

  faqItems: FaqItem[] = [
    { id: 1, question: 'Sahiplenme süreci ne kadar sürer?', answer: 'Ortalama olarak 3-5 gün içerisinde tamamlanmaktadır.' },
    { id: 2, question: 'Sahiplendiğim hayvan aşılı ve kısırlaştırılmış mı olacak?', answer: 'Evet, barınağımızdan sahiplenilen tüm hayvanlar teslim edilmeden önce gerekli aşıları yapılır, iç-dış parazit tedavisi uygulanır ve uygun yaşta olanlar kısırlaştırılır.' },
    { id: 3, question: 'Sahiplenme için bir ücret ödemem gerekiyor mu?', answer: 'Hayır. Hayvan sahiplenirken herhangi bir ücret ödemeniz gerekmez.' },
    { id: 4, question: 'Barınağa terk edilmiş bir hayvan getirebilir miyim?', answer: 'Evet, sokakta bulduğunuz veya bakamayacağınız bir hayvanı barınağımıza getirebilirsiniz. Yoğunluk durumuna göre önce bizimle telefon veya form aracılığıyla iletişime geçmenizi öneririz.' },
    { id: 5, question: 'Sahiplendikten sonra hayvanı geri verebilir miyim?', answer: 'Sahiplenme sürecinin ciddiyetle ele alınmasını istesek de beklenmedik durumlar olabilir. Böyle bir durumda bizimle iletişime geçerek hayvanı barınağımıza güvenle geri teslim edebilirsiniz.' },
    { id: 6, question: 'Şehir dışından sahiplenme yapabilir miyim?', answer: 'Şehir dışından da sahiplenme başvurusu yapabilirsiniz. Ancak hayvanın teslimi için barınağımıza gelmeniz gerekmektedir.' },
    { id: 7, question: 'Barınağı ziyaret etmek için randevu almam gerekiyor mu?', answer: 'Bireysel ziyaretler için randevu şart değildir, ancak yoğun saatlerde bekleme yaşamamak adına "yardım" sayfamızdan önceden haber vermenizi tavsiye ederiz.' },
    { id: 8, question: 'Barınağa nasıl bağış yapabilirim?', answer: 'Sayfanın en altından erişebileceğiniz "Bağış Yap" sayfasından yapabilirsiniz.' }
  ]

  form = this.fb.group({
    fullName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    message: ['', Validators.required],
    photo: this.fb.control<File[] | null>(null, fileListValidator(4, 5))
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

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const newFiles = Array.from(input.files);

    const existingFiles = this.photoPreviews.map(p => p.file);
    const combinedFiles = [...existingFiles, ...newFiles];

    /*if (combinedFiles.length > 4) {
      alert('En fazla 4 fotoğraf yükleyebilirsiniz.');
      input.value = '';
      return;
    }*/

    this.updatePhotos(combinedFiles);
    //input.value = '';
  }

  removePhoto(index: number): void {
    URL.revokeObjectURL(this.photoPreviews[index].url);

    const remainingFiles = this.photoPreviews.filter((_, i) => i !== index).map(p => p.file);

    this.updatePhotos(remainingFiles);
  }

  private updatePhotos(files: File[]): void {
    this.photoPreviews.forEach(p => URL.revokeObjectURL(p.url));

    this.photoPreviews = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));

    this.form.controls.photo.setValue(files.length ? files : null);
    this.form.controls.photo.markAsTouched();
    this.form.controls.photo.markAsDirty();
  }

  onSubmit(): void {
    if (this.form.invalid || !this.captchaToken()) {
      this.form.markAllAsTouched();
      return;
    }
  }

  ngOnDestroy(): void {
    this.photoPreviews.forEach(p => URL.revokeObjectURL(p.url));
  }
}
