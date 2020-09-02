import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemappingComponent } from './remapping.component';

describe('RemappingComponent', () => {
  let component: RemappingComponent;
  let fixture: ComponentFixture<RemappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
