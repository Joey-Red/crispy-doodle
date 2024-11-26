import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OhCrudComponent } from './oh-crud.component';

describe('OhCrudComponent', () => {
  let component: OhCrudComponent;
  let fixture: ComponentFixture<OhCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OhCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OhCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
