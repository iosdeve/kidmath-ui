import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConentComponent } from './conent.component';

describe('ConentComponent', () => {
  let component: ConentComponent;
  let fixture: ComponentFixture<ConentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
