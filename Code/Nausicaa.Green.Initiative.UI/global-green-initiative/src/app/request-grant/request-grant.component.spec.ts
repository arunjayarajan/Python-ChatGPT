import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestGrantComponent } from './request-grant.component';

describe('ApplyGrantComponent', () => {
  let component: RequestGrantComponent;
  let fixture: ComponentFixture<RequestGrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestGrantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestGrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
