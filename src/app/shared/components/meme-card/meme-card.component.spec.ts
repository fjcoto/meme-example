import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MemeCardComponent } from './meme-card.component';
import { MemeDTO } from '../../models/meme.dto';

describe('MemeCardComponent', () => {
  let component: MemeCardComponent;
  let fixture: ComponentFixture<MemeCardComponent>;

  const mockMeme: MemeDTO = {
    id: '123',
    name: 'Test Meme',
    url: 'https://example.com/meme.jpg',
    width: 600,
    height: 400,
    box_count: 2
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemeCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MemeCardComponent);
    component = fixture.componentInstance;
    component.meme = mockMeme;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render meme name and image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img');
    const title = compiled.querySelector('h3');

    expect(img?.src).toBe(mockMeme.url);
    expect(title?.textContent).toContain(mockMeme.name);
  });

  it('should increment likes when button is clicked', () => {
    const button = fixture.debugElement.query(By.css('button'));
    const initialLikes = component.likes;

    button.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.likes).toBe(initialLikes + 1);

    const likesText = fixture.nativeElement.querySelector('p')?.textContent;
    expect(likesText).toContain(`Likes: ${initialLikes + 1}`);
  });
});
