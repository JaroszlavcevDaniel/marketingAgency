import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Article } from '../models/articleModel';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private apiUrl = 'http://localhost:3000/articles-api.php';

  constructor(private http: HttpClient) {}

  // Csak a cikkek letöltése
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl).pipe(
      // Az 'items' után odaírjuk, hogy : Article[]
      map((items: Article[]) => items.filter(item => item.isArticle))
    );
  }

  // Csak a lejátszási listák letöltése
  getPlaylists(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl).pipe(
      // Itt is megadjuk a típust
      map((items: Article[]) => items.filter(item => item.isPlaylist))
    );
  }

  // Egy konkrét elem lekérése ID alapján
  getItemById(id: number): Observable<Article | undefined> {
    return this.http.get<Article[]>(this.apiUrl).pipe(
      // Itt is megadjuk a típust
      map((items: Article[]) => items.find(item => item.id === id))
    );
  }
}