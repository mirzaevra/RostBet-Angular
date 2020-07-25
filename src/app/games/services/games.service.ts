import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable()
export class GamesService {
  constructor(private httpClient: HttpClient) {
  }

  public getAll(): Observable<any> {
    return this.httpClient.get(`${environment.api}`);
  }
}
