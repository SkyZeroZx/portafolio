import { Component, OnInit } from '@angular/core';
import { faMobile, faLaptop, faVialCircleCheck, faInfinity } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-can-do',
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
