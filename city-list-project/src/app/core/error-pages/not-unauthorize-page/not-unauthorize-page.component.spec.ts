import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotUnauthorizePageComponent } from './not-unauthorize-page.component';

describe('NotUnauthorizePageComponent', () => {
  let component: NotUnauthorizePageComponent;
  let fixture: ComponentFixture<NotUnauthorizePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotUnauthorizePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotUnauthorizePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
