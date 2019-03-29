import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { QuizComponent } from './quiz/quiz.component';
import { CoursComponent } from './dashbord/cours/cours.component';
import { TestComponent } from './dashbord/test/test.component';
import { AddtestComponent } from './dashbord/test/addtest/addtest.component';
import { CandidatComponent } from './dashbord/candidat/candidat.component';
import { AddCandidatComponent } from './dashbord/candidat/addcandidat/addcandidat.component';
import { CoachComponent } from './dashbord/coach/coach.component';
import { AddcoachComponent } from './dashbord/coach/addcoach/addcoach.component';
import { AddcoursComponent } from './dashbord/cours/addcours/addcours.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'coach', component: CoachComponent },
  { path: 'addcoach', component: AddcoachComponent },
  { path: 'cours', component: CoursComponent },
  { path: 'addcours', component: AddcoursComponent },
  { path: 'dashbord', component: DashbordComponent },
  { path: 'test', component: TestComponent },
  { path: 'addtest', component: AddtestComponent },
  { path: 'candidat', component: CandidatComponent },
  { path: 'addcandidat', component: AddCandidatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
