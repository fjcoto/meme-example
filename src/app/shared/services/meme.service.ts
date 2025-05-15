import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MemeDTO } from '../models/meme.dto';

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  private readonly apiUrl = 'https://api.imgflip.com/get_memes';

  constructor(private http: HttpClient) { }

  getMemes(): Observable<MemeDTO[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response?.data?.memes || [])
    );
  }

  getRandomMeme(): Observable<MemeDTO | null> {
    return this.getMemes().pipe(
      map(memes => memes.length > 0 ? memes[Math.floor(Math.random() * memes.length)] : null)
    );
  }
}
