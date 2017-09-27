import { TestBed, inject } from '@angular/core/testing';

import { DonateBloodComponent } from './donate-blood.component';

describe('a donate-blood component', () => {
	let component: DonateBloodComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				DonateBloodComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([DonateBloodComponent], (DonateBloodComponent) => {
		component = DonateBloodComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});