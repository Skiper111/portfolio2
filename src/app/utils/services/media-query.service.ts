import { Injectable } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Injectable()

export class MediaQueryService {

  private mobileQuery: MediaQueryList;
  private mediaQuery: MediaQueryList;

  constructor(
    private media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 760px)');
    this.mediaQuery = media.matchMedia('(max-width: 1024px)');
  }

  public isMobile() {
    return this.mobileQuery.matches;
  }

  public isMediumDevice() {
    return this.mediaQuery.matches;
  }

}