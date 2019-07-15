import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    constructor(private _httpService: HttpService){
        this.getCakesFromService();
    }
    cakes = [];
    cake: any;
    showCake: any;
    ngOnInit(){
        this.cake = {name : "", image: null};
    }
    getCakesFromService(){
        let observable = this._httpService.getCakes();
        observable.subscribe((data : {data: any}) => {
            this.cakes = data.data; 
            console.log("Got all!", this.cakes)
        });
    }

    newCakeFromService(newcake){
        let cake = this._httpService.newCake(newcake);
        cake.subscribe(data => {
            console.log("Create new cake!", data)
        });
    }

    addRatingFromService(newcake){
        let cake = this._httpService.addRating(newcake);
        cake.subscribe(data => {
            console.log("Add rating: ", data)
        });
    }

    onButtonClick(): void {         
        this.getCakesFromService();
    }
    onSubmit() {
        this.newCakeFromService(this.cake);
        this.cake = {name: "", image: null};
    }
   
    onSubmitRating(newcake){
        this.cake = newcake;
        this.addRatingFromService(this.cake);
        this.getCakesFromService();
    }

    onShowCake(cake){
        this.cake = cake;
    }

    cakeToShow(cake){
        this.showCake = cake;
    }

    deleteCakeFromService(newcake){
        let cake = this._httpService.deleteCake(newcake);
        cake.subscribe(data => {
            console.log("Add rating: ", data)
        });
    }
    onButtonClickDeletecake(cake){
        this.cake = cake;
        this.deleteCakeFromService(this.cake);
        this.getCakesFromService();
    }
}