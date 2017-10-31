import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorHandler } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Client } from '../models/Client';

@Injectable()
export class ClientService {
  private url = 'http://localhost:5001/api/client';

  constructor(private http: Http) { }

  getAll(): Observable<Client[]> {
    return this.http.get(this.url)
      .map(response => response.json() as Client[]);
  }

  getOne(id: number): Observable<Client> {
    return this.http.get(`${this.url}/${id}`)
      .map(response => response.json().data as Client);
  }

  create(client: Client) {
    return this.http.post(this.url, JSON.stringify(client))
      .map(response => response.json())
      .catch(this.handleError);
  }

  update(client: Client) {
    return this.http.patch(`${this.url}/${client.id}`, JSON.stringify(client))
      .map(response => response.json())
      .catch(this.handleError);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`)
      .map(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw('Bad Request');
    }

    if (error.status === 404) {
      return Observable.throw('Not Found');
    }
    return Observable.throw('Error Occurred');
  }
}
