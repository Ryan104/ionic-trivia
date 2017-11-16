import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TriviaService {
	exampleUrl = "https://opentdb.com/api.php?amount=10&type=multiple";
	score: number = 0;
	
	constructor(private http: Http) {}

	getQuestions(){
		return this.http.get(this.exampleUrl);
	}

	increaseScore(points){
		this.score += points;
	}

}