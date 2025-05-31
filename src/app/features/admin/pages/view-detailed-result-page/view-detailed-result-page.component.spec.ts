import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailedResultPageComponent } from './view-detailed-result-page.component';

describe('ViewDetailedResultPageComponent', () => {
  let component: ViewDetailedResultPageComponent;
  let fixture: ComponentFixture<ViewDetailedResultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDetailedResultPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailedResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
