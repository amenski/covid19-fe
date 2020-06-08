import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RumorReportingComponent } from './rumor-reporting.component';

describe('RumorReportingComponent', () => {
  let component: RumorReportingComponent;
  let fixture: ComponentFixture<RumorReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RumorReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RumorReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
