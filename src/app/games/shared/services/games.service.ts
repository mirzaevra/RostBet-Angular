import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {ResponseAPI} from '../../../shared/interface';

@Injectable()
export class GamesService {
  constructor(private httpClient: HttpClient) {
  }

  public getAll(): Observable<ResponseAPI> {
    return this.httpClient.get<ResponseAPI>(`${environment.api}`);
  }
}
