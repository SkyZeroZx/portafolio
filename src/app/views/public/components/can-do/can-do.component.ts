import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMobile, faLaptop, faVialCircleCheck, faInfinity } from '@fortawesome/free-solid-svg-icons';
import { TranslatePipe } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { AddAnimationDirective } from '@core/directives';

@Component({
	selector: 'app-can-do',
	imports: [AddAnimationDirective, FontAwesomeModule, TranslatePipe],
	templateUrl: './can-do.component.html',
	styleUrls: ['./can-do.component.scss']
})
export class CanDoComponent implements OnInit {
	private readonly isLoadCanDo = new Subject<boolean>();
	faMobile = faMobile;
	faLaptop = faLaptop;
	faVialCircleCheck = faVialCircleCheck;
	faInfinity = faInfinity;

	ngOnInit(): void {
		this.isLoadCanDo.next(true);
		this.isLoadCanDo.complete();
	}

	get isLoadCanDo$() {
		return this.isLoadCanDo.asObservable();
	}
}
