import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { MemeListComponent } from './meme-list.component';
import { MemeService } from '../../shared/services/meme.service';
import { MemeDTO } from '../../shared/models/meme.dto';

const mockMemes: MemeDTO[] = [
  { id: '1', name: 'Meme 1', url: 'url1', width: 500, height: 300, box_count: 2 },
  { id: '2', name: 'Meme 2', url: 'url2', width: 400, height: 250, box_count: 1 }
];

describe('MemeListComponent', () => {
  let component: MemeListComponent;
  let fixture: ComponentFixture<MemeListComponent>;
  let memeServiceSpy: jasmine.SpyObj<MemeService>;

  beforeEach(async () => {
    memeServiceSpy = jasmine.createSpyObj('MemeService', ['getMemes']);

    await TestBed.configureTestingModule({
      imports: [MemeListComponent],
      providers: [
        { provide: MemeService, useValue: memeServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              routeConfig: { path: '' }
            }
          }
        }
      ]
    }).compileComponents();
  });

  function createComponent() {
    fixture = TestBed.createComponent(MemeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    memeServiceSpy.getMemes.and.returnValue(of(mockMemes));
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should load memes (non-random)', () => {
    memeServiceSpy.getMemes.and.returnValue(of(mockMemes));
    createComponent();

    expect(component.loading).toBeFalse();
    expect(component.memes).toEqual(mockMemes);
  });

  it('should shuffle memes when route is "random"', () => {
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: {
        snapshot: { routeConfig: { path: 'random' } }
      }
    });

    memeServiceSpy.getMemes.and.returnValue(of(mockMemes));

    fixture = TestBed.createComponent(MemeListComponent);
    component = fixture.componentInstance;

    const shuffleSpy = spyOn<any>(component, 'shuffle').and.callThrough();

    fixture.detectChanges();

    expect(component.isRandom).toBeTrue();
    expect(shuffleSpy).toHaveBeenCalled();
    expect(component.memes).not.toBe(mockMemes);
    expect(component.memes.length).toBe(mockMemes.length);
  });

});
