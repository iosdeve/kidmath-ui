import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathlistComponent } from './mathlist.component';

describe('MathlistComponent', () => {
  let component: MathlistComponent;
  let fixture: ComponentFixture<MathlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MathlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
