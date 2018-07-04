import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Injectable} from '@angular/core';
import {forkJoin} from 'rxjs';

// change to new RxJS 6 import syntax
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class DemoService {
 
    constructor(private http:HttpClient) {}
 
    getBooksAndMovies() {
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin(
            this.http.get('https://reqres.in/api/users?page=2'),
            // this.http.get('/api/movies')
        );
    }
}