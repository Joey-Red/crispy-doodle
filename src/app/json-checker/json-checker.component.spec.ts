import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonCheckerComponent } from './json-checker.component';

describe('JsonCheckerComponent', () => {
  let component: JsonCheckerComponent;
  let fixture: ComponentFixture<JsonCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonCheckerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
