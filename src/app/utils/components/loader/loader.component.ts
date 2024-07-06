import { AfterViewInit, Component } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MediaQueryService } from '../../services/media-query.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements AfterViewInit {

  private chars!: any[];
  private charsWrapper!: any[];
  private wrapper!: any[];
  constructor(
    private mediaQueryService: MediaQueryService
  ) {
    
  }

  public ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.createAnimation();
  }

  public createAnimation(): void {
    this.chars = gsap.utils.toArray('.char').reverse();
    this.wrapper = gsap.utils.toArray('.loader-wrapper');
    this.charsWrapper = gsap.utils.toArray('.chars-wrapper');
    if (!this.mediaQueryService.isMobile()) {
      this.createDekstopAnimation();
    } else {
      this.createMobileAnimation();
    }
    this.hideChars();
  }

  public createMobileAnimation(): void {
    gsap.to(this.chars, {
      delay: 1.5,
      y: -300,
      rotateX: -180,
      opacity: 0,
      zIndex: 0,
      duration: 1,
      ease: 'none',
    })
    gsap.to(this.wrapper, {
      yPercent: -100,
      duration: 1.5,
      delay: 1,
      ease: 'none'
    })
  }

  public createDekstopAnimation(): void {
    const tl = gsap.timeline({delay: 1.3});
    this.chars.forEach((char: any) => {
      tl.to(char,
        {
          x: -100,
          rotateY: -360,
          opacity: 0,
          zIndex: 0,
          duration: 0.08,
          ease: 'none',
        }
      )
    });

    gsap.to(this.wrapper, {
      xPercent: -100,
      duration: 1.5,
      delay: 1,
      ease: 'none'
    })
  }

  public hideChars(): void {
    gsap.to(this.charsWrapper, {
      display: 'none',
      delay: 3
    })
  }
}
