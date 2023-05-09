import { isDevMode } from '@angular/core';
import { SwRegistrationOptions } from '@angular/service-worker';

export const swRegistrationOptions: SwRegistrationOptions = {
	enabled: !isDevMode(),
	// Register the ServiceWorker as soon as the application is stable
	// or after 30 seconds (whichever comes first).
	registrationStrategy: 'registerWhenStable:30000'
};
