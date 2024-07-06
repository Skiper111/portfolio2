import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProjectsComponent implements OnInit {

  private colors = ['#e49366', '#798e7b', '#b692a1', '#bfccd8'];
  public projects = [
    {
      link: 'https://a-bank.com.ua/',
      title: 'projects.project_title_01',
      text: 'projects.project_text_01',
      imgLink: '../assets/img/projects/a-bank-site.png',
    },
    {
      link: 'https://codepen.io/Skiper111/pen/rNgdxXW',
      title: 'projects.project_title_02',
      text: 'projects.project_text_02',
    },
    {
      link: 'https://a-bank.com.ua/mobile-menu-qr',
      title: 'projects.project_title_03',
      text: 'projects.project_text_03',
      imgLink: '../assets/img/projects/mobile-menu.png',
    },
    {
      link: 'https://a-bank.com.ua/business-card/person?ref=3ed66ad0-c824-499d-a7c5-480007b65a5d',
      title: 'projects.project_title_04',
      text: 'projects.project_text_04',
      imgLink: '../assets/img/projects/business_card.png',
    },
    {
      link: 'assets/img/projects/qr_black.png',
      title: 'projects.project_title_05',
      text: 'projects.project_text_05',
      imgLink: '../assets/img/projects/qr_black.png',
    }
  ];

  public ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
  }

  public projectHoverEvent(event: any): void {

    const { width, height, top, left } = event.target.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;

    const topDist = y;
    const bottomDist = height - y;
    const leftDist = x;
    const rightDist = width - x;

    const minDist = Math.min(topDist, bottomDist, leftDist, rightDist);

    const bg = event.target.querySelector(".project-bg");
    const colorIndex = gsap.utils.random(0, 3, 1);
    const ease = 'power3.out';

    let fromTo: any = [{top: '-100%', left: 0}, {top: '0', duration: 0.6, ease}];
    let to: any = {top: '-100%'};

    if (minDist === bottomDist) {
      fromTo = [{top: '100%', left: 0}, {top: '0', duration: 0.6, ease}];
      to = {top: '100%', duration: 0.6, ease};
    } else if (minDist === leftDist) {
      fromTo = [{left: '-100%', top: '0'}, {left: '0', duration: 0.6, ease}];
      to = {left: '-100%', duration: 0.6, ease};
    } else if (minDist === rightDist) {
      fromTo = [{left: '100%', top: '0'}, {left: '0', duration: 0.6, ease}];
      to = {left: '100%', duration: 0.6, ease};
    }

    if (event.type === 'mouseenter') {
      gsap.timeline()
      .to(bg, {
        duration: 0,
        backgroundColor: this.colors[colorIndex],
      })
      .fromTo(bg, fromTo[0],
        fromTo[1])
    } else {
      gsap.to(bg, to);
    }
  }

}
