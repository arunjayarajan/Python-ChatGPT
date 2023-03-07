import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequestGrantComponent } from './update-request-grant.component';

describe('UpdateRequestGrantComponent', () => {
  let component: UpdateRequestGrantComponent;
  let fixture: ComponentFixture<UpdateRequestGrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRequestGrantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRequestGrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
