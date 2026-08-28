import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CountUp } from 'countup.js';
import * as AOS from 'aos';
import VanillaTilt from 'vanilla-tilt';
import { ScrollToTopComponent } from "@shared/scroll-to-top/scroll-to-top.component";

interface StatCard {
  value: number;
  suffix?: string;
  prefix?: string;
}


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, ScrollToTopComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit {
  @ViewChildren('countEl') countEls!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('tiltCard') tiltCards!: QueryList<ElementRef<HTMLElement>>;

  stats: StatCard[] = [
    { value: 250, suffix: '+', prefix: '🐾' },
    { value: 95, suffix: '%', prefix: '❤️' },
    { value: 12, prefix: '🙋‍♂️' }
  ];

  ngOnInit(): void {
    AOS.init({
      duration: 1000,
      once: true // sadece bir kez animasyon gösterilsin
    });
  }

  ngAfterViewInit(): void {
    this.countEls.forEach((el, index) => {
      const countUp = new CountUp(el.nativeElement, this.stats[index].value, {
        duration: 2,
        separator: '.',
        suffix: this.stats[index].suffix ?? '',
        prefix: this.stats[index].prefix ?? ''
      });

      if (!countUp.error) {
        countUp.start();
      }
      else {
        console.error(countUp.error);
      }
    })


    this.tiltCards.forEach(card => {
      VanillaTilt.init(card.nativeElement, {
        speed: 400,
        glare: true,
        'max-glare': 0.3,
        perspective: 1000,
        scale: 1.03
      });
    });
  }
}