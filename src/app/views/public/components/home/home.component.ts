import { Component, AfterViewInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Typewriter from 't-writer.js';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
	faWhatsApp = faWhatsapp;

	@ViewChild('asTitle') asTitle: ElementRef;
	@Output() isLoad = new EventEmitter<void>();

	ngAfterViewInit(): void {
		this.initEffect();
	}

	emitLoad(): void {
		this.isLoad.emit();
	}

	initEffect(): void {
		const target = this.asTitle.nativeElement;
		const writer = new Typewriter(target, {
			loop: true,
			typeColor: 'rgb(241 245 249)'
		});

		writer
			.changeCursorColor('rgb(241 245 249)')
			.type('Jaime Burgos')
			.rest(2000)
			.clear()
			.type('Software Engineer')
			.rest(2000)
			.clear()
			.type('Developer')
			.rest(2000)
			.start();
	}
}
