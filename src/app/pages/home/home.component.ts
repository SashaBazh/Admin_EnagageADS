import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('slider') slider!: ElementRef<HTMLElement>;

  images = [
    '../../../assets/images/workers/worker1.png',
    '../../../assets/images/workers/worker2.png',
    '../../../assets/images/workers/worker3.png',
    '../../../assets/images/workers/worker4.png',
    '../../../assets/images/workers/worker5.png',
    '../../../assets/images/workers/worker6.png',
  ];
  currentIndex = 0;

  ngAfterViewInit() {
    this.updateSlider();
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateSlider();
  }

  private updateSlider() {
    if (this.slider?.nativeElement) {
      this.slider.nativeElement.style.transform = `translateX(-${this.currentIndex * 33.33}%)`;
    }
  }
}
