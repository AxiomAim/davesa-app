import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicTasksComponent } from './clinic-tasks.component';

describe('ClinicTasksComponent', () => {
  let component: ClinicTasksComponent;
  let fixture: ComponentFixture<ClinicTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
