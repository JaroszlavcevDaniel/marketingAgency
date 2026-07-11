import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feauture } from './feauture';

describe('Feauture', () => {
  let component: Feauture;
  let fixture: ComponentFixture<Feauture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Feauture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Feauture);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
