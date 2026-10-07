import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Article } from '../models/articleModel';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private apiUrl = 'https://n17.hu/articles-api.php';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl).pipe(
      map((items: Article[]) => items.filter(item => item.isArticle))
    );
  }

  getPlaylists(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl).pipe(
      map((items: Article[]) => items.filter(item => item.isPlaylist))
    );
  }

  getItemById(id: number): Observable<Article | undefined> {
    return this.http.get<Article[]>(this.apiUrl).pipe(
      map((items: Article[]) => items.find(item => item.id === id))
    );
  }
}