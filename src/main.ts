import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';


  // bootstrapApplication(AppComponent, {providers: [
  //   provideHttpClient(),
  // ]});

  
  // bootstrapApplication(AppComponent, appConfig)
  // .catch((err)=> console.error(err));

  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      importProvidersFrom(HttpClientModule)  // Ensure HttpClientModule is provided here
    ]
  }).catch(err => console.error(err));