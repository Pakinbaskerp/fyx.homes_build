import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { customInterceptor } from './app/custom.interceptor';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [...appConfig.providers, provideHttpClient(withFetch(),withInterceptors([customInterceptor]))],
}).catch((err) => console.error(err));
