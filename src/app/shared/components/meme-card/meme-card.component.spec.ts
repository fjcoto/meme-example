import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeCardComponent } from './meme-card.component';

describe('MemeCardComponent', () => {
  let component: MemeCardComponent;
  let fixture: ComponentFixture<MemeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
