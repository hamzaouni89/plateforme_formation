import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../../../../../model/quiz';
import { Subscription } from 'rxjs';
import { QuizService } from '../../../service/quiz.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/service/cours.service';
@Component({
  selector: 'app-test-candidat',
  templateUrl: './test-candidat.component.html',
  styleUrls: ['./test-candidat.component.css']
})
export class TestCandidatComponent implements OnInit {

  isLoading = false;
  questions: Quiz[] = [];
  private questionsSub: Subscription;
  isTimeUp = false;
  tests: any;
  reponse;
  correctAnswer: any;
  marks = 0;
  index;
  timeDone;
  counter;
  interval = 1000;
  cours: any;
  count = 0;
  onchange = false;
  user ;
  quizByniveau;
  coursByniveau;
  nbrCoursValide=0;
  constructor(public quizService: QuizService, public userService: UserService, private router: Router, public coursService: CoursService) {
    this.coursService.getCoursByNiveau(userService.connectedUser.niveau).subscribe(res => {
      this.cours = res;
    })
  }
  ngOnInit() {
    this.userService.connectedUser = this.userService.getDecodedToken();
    this.user = this.userService.connectedUser;
    this.quizService.getQuizByNiveau(this.userService.connectedUser.niveau).subscribe(res => {
      this.quizByniveau = res;
      console.log(this.quizByniveau);
      
    })

    this.correctAnswer = [];
    this.reponse = [];
    this.index = 0;
    this.counter = 0;
    this.isLoading = true;
    this.getCorrectesReponses();
    this.getTestByNiveau();
    this.getCoursByNiveau();
  }
 changeVal(){
   this.onchange = true;
 }
  getCorrectesReponses() {
    this.questionsSub = this.quizService.getQuizByNiveau(this.userService.connectedUser.niveau)
      .subscribe((questionData: any) => {
        console.log(questionData);
        
        this.questions = questionData[0].questions;
        console.log(this.questions);
        for (let q = 0; q < this.questions.length; q++) {
          this.correctAnswer[q] = { _id: this.questions[q]._id!, reponse: this.questions[q].reponse }
        }
      });
    console.log(this.correctAnswer)
  }

  getMark() {
    for (let q = 0; q < this.correctAnswer.length; q++) {
      if (this.correctAnswer[q]._id == this.reponse[q]._id && this.correctAnswer[q].reponse == this.reponse[q].reponse) {
        this.marks++;
      }
    }

    this.userService.sendMarks(this.userService.connectedUser, this.marks).subscribe(res => {
      this.router.navigateByUrl('/dashbordCandidat/profilCandidat')
      console.log(this.marks++);
    })
  }

  isAnswered(question) {
    return question.questions.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question) {
    return question.questions.every(x => (x.choix1 === x.reponse || x.choix2 === x.reponse || x.choix3 === x.reponse || x.choix4 === x.reponse)) ? 'correct' : 'wrong';
  };
  getTestByNiveau() {
    this.quizService.getQuizByNiveau(this.userService.connectedUser.niveau)
      .subscribe((res: any) => {
        for (const cour of this.cours) {
          if(cour.status.length > 0){
          for (const stat of cour.status) {
            if (stat.statu === 'Valider' && stat.idCandidat === this.userService.connectedUser.candidat) {
              this.count++
            }
          }
          if (this.count === this.cours.length) {
            this.tests = res[0];  
            console.log(this.tests.questions.length);
                      
          }
        }
        }
      })
  }

  getCoursByNiveau() {
    this.coursService.getCoursByNiveau(this.userService.connectedUser.niveau).subscribe(res => {
      this.coursByniveau = res;
      for (const cour of this.coursByniveau) {
          if(cour.status.length > 0){
            for (const stat of cour.status) {
              if( stat.statu === 'Valider' && stat.idCandidat === this.userService.connectedUser.candidat)
              {
                this.nbrCoursValide++;  
              }
            }
          }
      }
    })
  }

  goTo(index: number) {
    if (index >= 0 && index < this.questions.length) {
      this.index = index;
    }
  }
  onSelect(question, option) {
    this.reponse[this.index] = { _id: question, reponse: option }
    console.log(this.reponse);


  }

  onSubmit() {
    this.index++;
    // for (let a = 0; a < this.questions.length; a++) {
    //   if (this.reponse[a] === this.correctAnswer[a]) {
    //     this.marks += 1;
    //   }
    // }
    // console.log(this.marks);

  }

  ngOnDestroy() {
    this.questionsSub.unsubscribe();
  }

  convertMinsToHrsMinsSecs(mins) {

    let h = Math.floor(mins / 60);
    let m = mins % 60;
    let s = mins - (m + (h * 60));
    return `${h}:${m}:${s}`;
  }


 

}
