import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MemeService } from './meme.service';
import { MemeApiResponse } from '../models/meme.dto';

describe('MemeService', () => {
  let service: MemeService;
  let httpMock: HttpTestingController;

  const mockResponse: MemeApiResponse = {
    success: true,
    data: {
      memes: [
        {
          id: '1',
          name: 'Test Meme',
          url: 'https://example.com/meme.jpg',
          width: 500,
          height: 300,
          box_count: 2
        }
      ]
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemeService]
    });

    service = TestBed.inject(MemeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve memes', () => {
    service.getMemes().subscribe(memes => {
      expect(memes.length).toBe(1);
      expect(memes[0].name).toBe('Test Meme');
    });

    const req = httpMock.expectOne('https://api.imgflip.com/get_memes');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should retrieve a random meme or null', () => {
    service.getRandomMeme().subscribe(meme => {
      expect(meme).toBeTruthy();
      expect(meme?.name).toBe('Test Meme');
    });

    const req = httpMock.expectOne('https://api.imgflip.com/get_memes');
    req.flush(mockResponse);
  });

  it('should return null if no memes are available', () => {
    const emptyResponse: MemeApiResponse = {
      success: true,
      data: {
        memes: []
      }
    };

    service.getRandomMeme().subscribe(meme => {
      expect(meme).toBeNull();
    });

    const req = httpMock.expectOne('https://api.imgflip.com/get_memes');
    req.flush(emptyResponse);
  });
});
