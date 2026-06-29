import { DOCUMENT } from '@angular/common';
import {
	ApplicationRef,
	ComponentRef,
	EmbeddedViewRef,
	EnvironmentInjector,
	Injectable,
	Type,
	createComponent,
	inject
} from '@angular/core';

interface ModalOptions {
	host?: HTMLElement;
	inputs?: Record<string, unknown>;
}

@Injectable({
	providedIn: 'root'
})
export class ModalService {
	private componentRef?: ComponentRef<unknown>;
	private readonly applicationRef = inject(ApplicationRef);
	private readonly document = inject<Document>(DOCUMENT);
	private readonly environmentInjector = inject(EnvironmentInjector);

	async open<TComponent>(component: Type<TComponent>, options: ModalOptions = {}): Promise<void> {
		this.close();

		const componentRef = createComponent(component, {
			environmentInjector: this.environmentInjector
		});

		this.applicationRef.attachView(componentRef.hostView);
		(options.host ?? this.document.body).appendChild(this.getRootNode(componentRef));
		this.componentRef = componentRef as ComponentRef<unknown>;

		for (const [inputName, inputValue] of Object.entries(options.inputs ?? {})) {
			componentRef.setInput(inputName, inputValue);
		}

		componentRef.onDestroy(() => this.detach(componentRef as ComponentRef<unknown>));
		await this.applicationRef.whenStable();
	}

	close(): void {
		if (!this.componentRef || this.componentRef.hostView.destroyed) {
			return;
		}

		const componentRef = this.componentRef;

		this.detach(componentRef);
		componentRef.destroy();
	}

	private getRootNode<TComponent>(componentRef: ComponentRef<TComponent>): HTMLElement {
		const [rootNode] = (componentRef.hostView as EmbeddedViewRef<unknown>).rootNodes;

		return rootNode as HTMLElement;
	}

	private detach(componentRef: ComponentRef<unknown>): void {
		if (this.componentRef !== componentRef) {
			return;
		}

		this.applicationRef.detachView(componentRef.hostView);
		this.componentRef = undefined;
	}
}
