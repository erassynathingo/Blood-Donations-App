import { TestBed, inject } from '@angular/core/testing';

import { RequestComponent } from './request.component';

describe('a request component', () => {
	let component: RequestComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				RequestComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([RequestComponent], (RequestComponent) => {
		component = RequestComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});