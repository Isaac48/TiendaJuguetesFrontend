import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJuguetesComponent } from './list-juguetes.component';

describe('ListJuguetesComponent', () => {
  let component: ListJuguetesComponent;
  let fixture: ComponentFixture<ListJuguetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListJuguetesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListJuguetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
