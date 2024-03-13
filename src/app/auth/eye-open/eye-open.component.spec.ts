import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeOpenComponent } from './eye-open.component';

describe('EyeOpenComponent', () => {
  let component: EyeOpenComponent;
  let fixture: ComponentFixture<EyeOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EyeOpenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EyeOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
