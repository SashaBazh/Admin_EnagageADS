import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingsComponent } from './mailings.component';

describe('MailingsComponent', () => {
  let component: MailingsComponent;
  let fixture: ComponentFixture<MailingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
