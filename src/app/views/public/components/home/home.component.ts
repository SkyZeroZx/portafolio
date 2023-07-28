import { TranslateService } from '@ngx-translate/core';
import { Component, Output, EventEmitter, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NgxTypedWriterComponent } from 'ngx-typed-writer';

@Component({
	selector: 'app-home',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	isMobile = false;
	isChangeLanguage = false;
	typpingList: string[] = ['Jaime Burgos', 'Software Engineer', 'Developer'];

	@ViewChild('writerContent')
	writerContent: NgxTypedWriterComponent;

	@Output() isLoad = new EventEmitter<void>();

	constructor(private readonly translateService: TranslateService) {}

	ngOnInit() {
		this.setTranslateTextToWriter();
	}

	emitLoad(): void {
		this.isLoad.emit();
	}

	setChangeLanguage() {
		this.isChangeLanguage = true;
	}

	setTranslateTextToWriter() {
		this.translateService.get('home.content').subscribe((data: string) => {
			this.writerContent.strings = [data];
			this.writerContent.ngOnInit();
		});
	}
}
