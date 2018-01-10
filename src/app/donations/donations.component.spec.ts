import { TestBed, inject } from '@angular/core/testing';

import { DonationsComponent } from './donations.component';

describe('a donations component', () => {
	let component: DonationsComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				DonationsComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([DonationsComponent], (DonationsComponent) => {
		component = DonationsComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});