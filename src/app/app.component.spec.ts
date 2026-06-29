import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
	it('creates the app shell', async () => {
		TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [provideRouter([])]
		});

		const fixture = TestBed.createComponent(AppComponent);

		await fixture.whenStable();

		expect(fixture.componentInstance).toBeTruthy();
	});
});
