import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanDoComponent } from './can-do.component';

describe('CanDoComponent', () => {
  let component: CanDoComponent;
  let fixture: ComponentFixture<CanDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanDoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
