import { Component } from '@angular/core';
import {socials} from '../../enums/socials.enum'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  public homeBannerSocials: {label: string, href: string}[] = socials;

}
