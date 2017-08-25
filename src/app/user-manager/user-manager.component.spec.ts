import { TestBed, inject } from '@angular/core/testing';

import { UserManagerComponent } from './user-manager.component';

describe('a user-manager component', () => {
	let component: UserManagerComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				UserManagerComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([UserManagerComponent], (UserManagerComponent) => {
		component = UserManagerComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});