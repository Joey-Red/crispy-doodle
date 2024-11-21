import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpedetyprComponent } from './spedetypr.component';

describe('SpedetyprComponent', () => {
  let component: SpedetyprComponent;
  let fixture: ComponentFixture<SpedetyprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpedetyprComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpedetyprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
