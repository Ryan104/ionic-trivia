import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TriviaService } from '../../app/trivia.service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
	score: number;
	questions = <any>[];
	round: number;

  constructor(public navCtrl: NavController, private triviaService : TriviaService) {

  }

  ngOnInit(){
  	this.score = 0;
  	this.getQuestions();
  }

  /* GET QUESTION */
  getQuestions(){
  	this.triviaService.getQuestions().subscribe(response => {
  		/* save the questions */
  		this.questions = response.json().results

  		/* Store all shufled q's in all_answers */
  		this.questions.forEach((question, i) => {
  			this.questions[i].all_answers = this.shuffleArray([...question.incorrect_answers, question.correct_answer])
  		})
  	})
  }

  checkAnswer(answer, question){
  	/* Check if answer is correct */
    if (answer === question.correct_answer) {
    	this.score += 10;
    }

    /* Remove question */
    let index = this.questions.indexOf(question);
    this.questions.splice(index, 1);
  }

  shuffleArray(array) {
  	/* Fisher-Yates suffle algorithm */
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

}
