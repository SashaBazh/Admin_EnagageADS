import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAssignmentsComponent } from './service-assignments.component';

describe('ServiceAssignmentsComponent', () => {
  let component: ServiceAssignmentsComponent;
  let fixture: ComponentFixture<ServiceAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceAssignmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
