import { Component, HostListener } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import * as AOS from 'aos';
import { RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ScrollToTopComponent } from '@shared/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CarouselModule, RouterLink, ScrollToTopComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isVisible = false;

  ngOnInit(): void {
    AOS.init({
      duration: 1000,
      once: true // sadece bir kez animasyon gösterilsin
    });
  }

  constructor(private viewportScroller: ViewportScroller) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.scrollY > 300;
  }

  scrollToHiw() {
    this.viewportScroller.scrollToAnchor('hiw');
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    lazyLoad: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


}
