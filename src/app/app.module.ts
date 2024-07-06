import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { NgOptimizedImage } from "@angular/common";
import { FooterComponent } from './utils/components/footer/footer.component';
import { LoaderProjectComponent } from './utils/components/loader-project/loader-project.component';
import { ProjectsComponent } from './utils/components/projects/projects.component';
import { MediaQueryService } from './utils/services/media-query.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './utils/components/loader/loader.component';

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const I18N_CONFIG = {
  defaultLanguage: 'en',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule,
    MatSelectModule,
    TranslateModule.forRoot(I18N_CONFIG)
  ],
  providers: [MediaQueryService, TranslatePipe],
  declarations: [
    AppComponent,
    FooterComponent,
    LoaderProjectComponent,
    ProjectsComponent,
    LoaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
