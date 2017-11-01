import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorHandler } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Client } from '../models/Client';
import { PatchModel } from '../models/PatchModel';

@Injectable()
export class ClientService {
  private url = 'http://localhost:5001/api/client';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getAll(): Observable<Client[]> {
    return this.http.get(this.url)
      .map(response => response.json() as Client[]);
  }

  getOne(id: number): Observable<Client> {
    return this.http.get(`${this.url}/${id}`)
      .map(response => response.json() as Client);
  }

  create(client: Client) {
    return this.http.post(this.url, JSON.stringify(client), { headers: this.headers })
      .map(response => response.json())
      .catch(this.handleError);
  }

  update(id: number, client: Client) {
    return this.http.put(`${this.url}/${id}`, JSON.stringify(client), { headers: this.headers })
      .map(response => response.json())
      .catch(this.handleError);
  }

  patch(id: number, patchs: PatchModel[]) {
    return this.http.patch(`${this.url}/${id}`, JSON.stringify(patchs), { headers: this.headers })
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
