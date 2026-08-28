import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ScrollToTopComponent } from "@shared/scroll-to-top/scroll-to-top.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, ScrollToTopComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  isMapLoaded = signal(false);

  onMapLoad(): void {
    this.isMapLoaded.set(true);
  }
}
