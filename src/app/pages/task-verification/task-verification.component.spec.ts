import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskVerificationComponent } from './task-verification.component';

describe('TaskVerificationComponent', () => {
  let component: TaskVerificationComponent;
  let fixture: ComponentFixture<TaskVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskVerificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
