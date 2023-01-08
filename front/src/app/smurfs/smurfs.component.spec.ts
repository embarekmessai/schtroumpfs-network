import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmurfsComponent } from './smurfs.component';

describe('SmurfsComponent', () => {
  let component: SmurfsComponent;
  let fixture: ComponentFixture<SmurfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmurfsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmurfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
