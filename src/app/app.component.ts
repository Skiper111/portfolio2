import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, inject} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { socials } from './utils/enums/socials.enum'
import { navItems } from './utils/enums/nav-items.enum';
import { MediaQueryService } from './utils/services/media-query.service';
import { TranslateService } from '@ngx-translate/core';

export interface ILanguageOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements AfterViewInit, OnInit {

  constructor(
   public mediaQueryService: MediaQueryService
  ) {}

  @ViewChild('scrollable') scrollableElement!: ElementRef;
  @ViewChild('projectsWrapper') projectsWrapper!: ElementRef;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChild('horizontalScrollWrapper') horizontalScrollWrapper!: ElementRef;
  @ViewChild('horizontalScrollContainer') horizontalScrollContainer!: ElementRef;
  @ViewChild('verticalScroll') verticalScroll!: ElementRef;
  private scrollTween!: any;
  public navItems: {label: string, color: string, link: string}[] = navItems;
  public homeBannerSocials: {label: string, href: string}[] = socials;
  public scrollSection: HTMLElement[] = [];
  public infoSection: HTMLElement[] = [];
  public infoSectionText: HTMLElement[] = [];
  public infoSectionTitle: HTMLElement[] = [];
  public infoSectionBanner: HTMLElement[] = [];
  public infoSectionBannerImg: HTMLElement[] = [];
  private readonly availableLanguages = ['en', 'ua'];
  private readonly translateService = inject(TranslateService);

  public ngOnInit(): void {
    this.scrollToTop();
  }

  public scrollToTop(): void {
    gsap.to(window, {
      scrollTo: {
        y: 0,
        offsetY: 0,
      },
    });
  }

  public ngAfterViewInit(): void {
    this.translateService.addLangs(this.availableLanguages);
    this.translateService.setDefaultLang('en');
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    setTimeout(() => {
      this.createAnimation();
    }, 150);
  }

  public createAnimation(): void {
    if (!this.mediaQueryService.isMediumDevice()) {
      this.createDekstopAnimation();
    } else {
      this.createMobileAnimation();
    }
  }

  public createMobileAnimation(): void {
    this.scrollSection = gsap.utils.toArray('.mobile-scroll-section');
    this.scrollSection.forEach((section: HTMLElement) => {
      ScrollTrigger.create({
        trigger: section,
        start: "bottom bottom",
        pin: true, 
        pinSpacing: false 
      })
    });
  }

  public createDekstopAnimation(): void {
    this.scrollSection = gsap.utils.toArray('.scroll-section');
    const totalScrollWidth = this.horizontalScrollContainer.nativeElement.scrollWidth - document.documentElement.clientWidth;
    this.scrollTween = gsap.to(this.horizontalScrollContainer.nativeElement, {
      x: -totalScrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: this.horizontalScrollWrapper.nativeElement,
        pin: true,
        scrub: 3,
        pinSpacing: false
      }
    });
    gsap.from(this.verticalScroll.nativeElement, {
      y: '100vh',
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: this.verticalScroll.nativeElement,
        scrub: 2
      }
    });
      // const scrollTween = gsap.to(this.scrollableElement.nativeElement, {
    //   x: -(this.scrollableElement.nativeElement.scrollWidth - document.documentElement.clientWidth) + "px",
    //   ease: 'none',
    //   scrollTrigger: {
    //     trigger: this.scrollableElement.nativeElement,
    //     pin: true,
    //     scrub: 2,
    //     end: () => `+=${this.scrollableElement.nativeElement.offsetWidth}`
    //   }
    // })
    this.scrollSection.forEach((section: HTMLElement, index) => {
      this.infoSection.push(gsap.utils.selector(section)('.info-section-body')[0]);
      this.infoSectionText.push(gsap.utils.selector(section)('.info-section-desc-text')[0]);
      this.infoSectionBannerImg.push(gsap.utils.selector(section)('.banner-img')[0]);
      this.infoSectionBanner.push(gsap.utils.selector(section)('.info-section-banner')[0]);
      this.infoSectionTitle.push(gsap.utils.selector(section)('.info-section-desc-title')[0]);

      if (index) {
        this.createTextAnimation(section, index);
        this.createCharAnimation(section, index);
      }
      if (index && index !== 1) {
        this.createContentAnimation(section, index);
        this.createBannerAnimation(section, index);
        this.createBannerWrapperAnimation(section, index);
      }
      if (this.scrollSection.length - 1 === index) {
        this.createLastBannerWrapperAnimation(section, index);
        this.createLastBannerAnimation(section, index);
      }
    })
  }

  public createTextAnimation(section: HTMLElement, index: number): void {
    const offset = section.offsetWidth;
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: index === 1 ? `$left+=${offset / 5} center` : `$left-=${offset / 4} center`,
        end: index === 1 ? `$left+=${offset / 5} center` : `$left-=${offset / 4} center`,
        containerAnimation: this.scrollTween,
        scrub: 2.5
      }
    });

    textTl.from((this.infoSectionText.pop() as HTMLElement), {transform: `translate3d(0px, 100%, 0px)`, ease: 'back.inOut(2)'});
  }

  public createCharAnimation(section: HTMLElement, index: number): void {
    const title = this.infoSectionTitle[index];
    
    const splitText = (title.textContent as string).split("").map((char: string) => {
        return `<div class="split-char">${char}</div>`;
    }).join('');
    title.innerHTML = splitText;
    const chars = gsap.utils.selector(title)('.split-char'); 
    const offset = section.offsetWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: index === 1 ? `$left+=${offset / 5} center` : `$left-=${offset / 4} center`,
        end: index === 1 ? `$left+=${offset / 5} center` : `$left-=${offset / 4} center`,
        containerAnimation: this.scrollTween,
        scrub: 4
      }
    });

    chars.forEach((char: any) => {
      tl.from(char, {transform: `translate3d(0px, 100%, 0px)`});
    })
  }

  public createContentAnimation(section: HTMLElement, index: number): void {
    const offset = section.offsetWidth;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: (this.scrollSection[index - 1] as any),
        start: index === 2 ? `left center` : `$left-=${offset / 2} center`,
        end: 'center center',
        containerAnimation: this.scrollTween,
        scrub: 1
      }
    });
    tl.to((this.infoSection.pop() as HTMLElement), {transform: `translate3d(0px, 0px, 0px)`});
  }

  public createBannerAnimation(section: HTMLElement, index: number): void {
    const offset = section.offsetWidth;
    const bannerImg = this.infoSectionBannerImg[index - 1];
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: (this.scrollSection[index - 1] as any),
        start: index === 2 ? `left center` : `$left-=${offset / 2} center`,
        end: 'center center',
        containerAnimation: this.scrollTween,
        scrub: 1
      }
    });
    tl.from(bannerImg, {'transform': 'translate3d(0px, 10rem, 0px) scale(1, 1.1)'});
  }

  public createLastBannerAnimation(section: HTMLElement, index: number): void {
    const offset = section.offsetWidth;
    const bannerImg = this.infoSectionBannerImg.pop();
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: (this.scrollSection[index - 1] as any),
        start: 'center center',
        end: `right+=${offset / 4} center`,
        containerAnimation: this.scrollTween,
        scrub: 1
      }
    });
    tl.from(bannerImg as HTMLElement, {'transform': 'translate3d(0px, 10rem, 0px) scale(1, 1.1)'});
  }

  public createBannerWrapperAnimation(section: HTMLElement, index: number): void {
    const offset = section.offsetWidth;
    const bannerImg = this.infoSectionBanner[index - 1];
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: (this.scrollSection[index - 1] as any),
        start: index === 2 ? `left center` : `$left-=${offset / 2} center`,
        end: 'center center',
        containerAnimation: this.scrollTween,
        scrub: 1
      }
    });
    tl.from(bannerImg, {'transform': 'translate3d(0px, 5rem, 0px) scale(1, 0.9)', 'max-height': '55svh'});
  }

  public createLastBannerWrapperAnimation(section: HTMLElement, index: number): void {
    const offset = section.offsetWidth;
    const bannerImg = this.infoSectionBanner[index];
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: (this.scrollSection[index - 1] as any),
        start: 'center center',
        end: `right+=${offset / 4} center`,
        containerAnimation: this.scrollTween,
        scrub: 1
      }
    });
    tl.from(bannerImg, {'transform': 'translate3d(0px, 5rem, 0px) scale(1, 0.9)', 'max-height': '55svh'});
  }

  public navigateToSection(link: string): void {
    
    const panelsContainer = this.horizontalScrollContainer.nativeElement;
    let targetElem: any = gsap.utils.selector('body')(link)[0],
    y = targetElem,
    offsetY = 150;
    
    if (targetElem && panelsContainer.isSameNode(targetElem.parentElement)) {
      let totalScroll = this.scrollTween.scrollTrigger.end - this.scrollTween.scrollTrigger.start,
        totalMovement = (this.scrollSection.length - 1) * targetElem.offsetWidth;
      y = Math.round(this.scrollTween.scrollTrigger.start + (targetElem.offsetLeft / totalMovement) * totalScroll);
      offsetY = -70;
    }

    if (this.mediaQueryService.isMediumDevice()) {offsetY = 0}

    gsap.to(window, {
      scrollTo: {
        y,
        offsetY,
        autoKill: false
      },
      duration: 2,
      ease: "power2.inOut"
    });
  }

}