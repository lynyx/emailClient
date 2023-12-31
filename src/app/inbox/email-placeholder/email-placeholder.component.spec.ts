import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPlaceholderComponent } from './email-placeholder.component';

describe('EmailPlaceholderComponent', () => {
  let component: EmailPlaceholderComponent;
  let fixture: ComponentFixture<EmailPlaceholderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailPlaceholderComponent]
    });
    fixture = TestBed.createComponent(EmailPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
