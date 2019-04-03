import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { QuizComponent } from './profil/quiz/quiz.component';
import { CoursComponent } from './profil/cours/cours.component';
import { TestComponent } from './dashbord/test/test.component';
import { AddtestComponent } from './dashbord/addtest/addtest.component';
import { CandidatComponent } from './dashbord/candidat/candidat.component';
import { AddCandidatComponent } from './dashbord/candidat/addcandidat/addcandidat.component';
import { CoachComponent } from './dashbord/coach/coach.component';
import { AddcoachComponent } from './dashbord/addcoach/addcoach.component';
import { AddcoursComponent } from './profil/addcours/addcours.component';
import { ProfilComponent } from './profil/profil.component';
import { AddquizComponent } from './profil/addquiz/addquiz.component';
import { CandidatsByNiveauComponent } from './profil/candidats-by-niveau/candidats-by-niveau.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'profil', component: ProfilComponent,
  children: [
    { path: 'quiz', component: QuizComponent },
    { path: 'addquiz', component: AddquizComponent },
    { path: 'addcours', component: AddcoursComponent },
    { path: 'cours', component: CoursComponent },
    { path: 'candidatByNiveau', component: CandidatsByNiveauComponent },
  ]
 },
 
  { path: 'addcandidat', component: AddCandidatComponent },
  {
    path: 'dashbord', component: DashbordComponent,
    children: [
      { path: "coach", component: CoachComponent },
      { path: "addcoach", component: AddcoachComponent, },
      { path: 'test', component: TestComponent },
      { path: 'addtest', component: AddtestComponent },
      { path: 'candidat', component: CandidatComponent }, 
      { path: 'addcours', component: AddcoursComponent },
    ]
  },
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
