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
	currentQuestion = {};
	cardStatusClass: string;

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

  		this.setCurrentQuestion();
  	})
  }

  checkAnswer(answer, question){
  	// next question callback
  	const next = () => {
			/* Remove current question */
		  this.questions.pop();
		  this.cardStatusClass = "";
		  /* Queue up next question */
		  this.setCurrentQuestion();
  	}

  	/* Check if answer is correct */
    if (answer === question.correct_answer) {
    	/* yay */
    	this.score += 10;
    	this.cardStatusClass = "correctCard";
    	setTimeout(next, 500)
    } else {
    	/* awww */
    	this.cardStatusClass = "incorrectCard";
    	setTimeout(next, 500)
    }
  }

  shuffleArray(array) {
  	/* Fisher-Yates suffle algorithm */
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  setCurrentQuestion(){
  	/* Set currentQuestion to the final question in the questions array */
  	this.currentQuestion = {};
  	if(this.questions.length === 0){
  		this.getQuestions();
  	} else {
  		this.currentQuestion = this.questions[this.questions.length - 1];
  	}
  }



}
