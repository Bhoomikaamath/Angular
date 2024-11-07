import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),
    provideStore()
]
}).catch(err => console.error(err));





// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { appConfig } from './app/app.config';
// import { HttpClientModule } from '@angular/common/http';
// import { importProvidersFrom } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';


//   // bootstrapApplication(AppComponent, {providers: [
//   //   provideHttpClient(),
//   // ]});

  
//   // bootstrapApplication(AppComponent, appConfig)
//   // .catch((err)=> console.error(err));

//   bootstrapApplication(AppComponent, {
//     providers: [
//       provideRouter(routes),
//       importProvidersFrom(HttpClientModule)  // Ensure HttpClientModule is provided here
//     ]
//   }).catch(err => console.error(err));