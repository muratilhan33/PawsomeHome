import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  paws: string[] = ['Ana Sayfa', 'Hakkında', 'İletişim'];
  support: string[] = ['Bağış Yap', 'Diğer'];
  social: string[] = ['Email', 'LinkedIn', 'Instagram', 'Twitter'];
}
