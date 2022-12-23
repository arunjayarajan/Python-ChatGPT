import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyGrantComponent } from './apply-grant.component';

describe('ApplyGrantComponent', () => {
  let component: ApplyGrantComponent;
  let fixture: ComponentFixture<ApplyGrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyGrantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyGrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
