import { TestBed, inject } from '@angular/core/testing';

import { BloodBankComponent } from './blood-bank.component';

describe('a blood-bank component', () => {
	let component: BloodBankComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				BloodBankComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([BloodBankComponent], (BloodBankComponent) => {
		component = BloodBankComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});