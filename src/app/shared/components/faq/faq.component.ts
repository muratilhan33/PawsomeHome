import { Component, input, signal } from '@angular/core';
import { FaqItem } from './faq-items.model';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  items = input.required<FaqItem[]>();

  activeId = signal<number | null>(null);

  toggle(id: number): void {
    this.activeId.update(current => current === id ? null : id);
  }

  isOpen(id: number): boolean {
    return this.activeId() === id;
  }
}
