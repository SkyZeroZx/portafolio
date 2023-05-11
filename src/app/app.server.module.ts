import { APP_ID, NgModule } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';
import { TranslateModule } from '@ngx-translate/core';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { translateModuleConfigServer } from '@core/config/translate/server';

@NgModule({
	imports: [AppModule, ServerModule, TranslateModule.forRoot(translateModuleConfigServer)],
	bootstrap: [AppComponent],
	providers: [provideClientHydration(), { provide: APP_ID, useValue: 'server-app' }]
})
export class AppServerModule {}
