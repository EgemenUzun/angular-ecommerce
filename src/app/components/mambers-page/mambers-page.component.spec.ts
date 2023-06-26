import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MambersPageComponent } from './mambers-page.component';

describe('MambersPageComponent', () => {
  let component: MambersPageComponent;
  let fixture: ComponentFixture<MambersPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MambersPageComponent]
    });
    fixture = TestBed.createComponent(MambersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
