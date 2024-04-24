import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetodoitemComponent } from './createtodoitem.component';

describe('CreatetodoitemComponent', () => {
  let component: CreatetodoitemComponent;
  let fixture: ComponentFixture<CreatetodoitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatetodoitemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatetodoitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
