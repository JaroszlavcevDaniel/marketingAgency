import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Needs } from './needs';

describe('Needs', () => {
  let component: Needs;
  let fixture: ComponentFixture<Needs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Needs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Needs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
