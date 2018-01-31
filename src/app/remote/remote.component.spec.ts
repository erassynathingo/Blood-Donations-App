import { TestBed, inject } from '@angular/core/testing';

import { RemoteComponent } from './remote.component';

describe('a remote component', () => {
	let component: RemoteComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				RemoteComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([RemoteComponent], (RemoteComponent) => {
		component = RemoteComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});