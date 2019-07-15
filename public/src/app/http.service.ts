import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class HttpService {
    constructor(private _http: HttpClient){
    }

    deleteCake(cake){
        return this._http.post('/delete', cake);
    }

    getCakes(){
        return this._http.get('/all');
    }

    newCake(cake){
        return this._http.post('/new', cake);
    }

    addRating(cake){
        return this._http.post('/edit', cake);
    }
}

