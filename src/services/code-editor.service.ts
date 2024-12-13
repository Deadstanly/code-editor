import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

const BASE_URL = 'http://localhost:3001/execute'
@Injectable({
  providedIn: 'root'
})
export class CodeEditorService {

  constructor(private http: HttpClient) { }

  checkCode(language: string, code: string): Observable<Record<string, string>[]> {
    const url: string = `${BASE_URL}?language=${language}&code=${encodeURIComponent(code)}`
    return this.http.get<Record<string, string>[]>(url);
  }
}
