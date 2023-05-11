import { Component } from '@angular/core';
import { faMobile, faLaptop, faVialCircleCheck, faInfinity } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-can-do',
	templateUrl: './can-do.component.html',
	styleUrls: ['./can-do.component.scss']
})
export class CanDoComponent {
	faMobile = faMobile;
	faLaptop = faLaptop;
	faVialCircleCheck = faVialCircleCheck;
	faInfinity = faInfinity;
}
