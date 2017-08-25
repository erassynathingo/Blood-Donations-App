import { TestBed, inject } from '@angular/core/testing';

import { CampsComponent } from './camps.component';

describe('a camps component', () => {
	let component: CampsComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CampsComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([CampsComponent], (CampsComponent) => {
		component = CampsComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});