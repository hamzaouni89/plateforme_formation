import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashbordAdminComponent } from './dashbordAdmin/dashbordAdmin.component';
import { QuizComponent } from './dashbordCoach/quiz/quiz.component';
import { CoursComponent } from './dashbordCoach/cours/cours.component';
import { TestComponent } from './dashbordAdmin/test/test.component';
import { AddtestComponent } from './dashbordAdmin/addtest/addtest.component';
import { CandidatComponent } from './dashbordAdmin/candidat/candidat.component';
import { AddCandidatComponent } from './dashbordAdmin/candidat/addcandidat/addcandidat.component';
import { CoachComponent } from './dashbordAdmin/coach/coach.component';
import { AddCoachComponent } from './dashbordAdmin/addcoach/addcoach.component';
import { AddcoursComponent } from './dashbordCoach/addcours/addcours.component';
import { DashbordCoachComponent } from './dashbordCoach/dashbordCoach.component';
import { AddquizComponent } from './dashbordCoach/addquiz/addquiz.component';
import { CandidatsByNiveauComponent } from './dashbordCoach/candidats-by-niveau/candidats-by-niveau.component';
import { DashbordCandidatComponent } from './dashbordCandidat/dashbordCandidat.component';
import { ProfilCandidatComponent } from './dashbordCandidat/profil-candidat/profil-candidat.component';
import { CoursCandidatComponent } from './dashbordCandidat/cours-candidat/cours-candidat.component';
import { TestInscriCandidatComponent } from './dashbordCandidat/test-inscri-candidat/test-inscri-candidat.component';
import { TestCandidatComponent } from './dashbordCandidat/test-candidat/test-candidat.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'dashbordCoach', component: DashbordCoachComponent,
  children: [
    { path: 'quiz', component: QuizComponent },
    { path: 'addquiz', component: AddquizComponent },
    { path: 'addcours', component: AddcoursComponent },
    { path: 'cours', component: CoursComponent },
    { path: 'candidatByNiveau', component: CandidatsByNiveauComponent },
  ]
 },
 { path: 'dashbordCandidat', component: DashbordCandidatComponent,
 children: [
   { path: 'profilCandidat', component: ProfilCandidatComponent },
   { path: 'coursCandidat' , component: CoursCandidatComponent},
   { path: 'testInscrit' , component: TestInscriCandidatComponent},
   { path: 'test' , component: TestCandidatComponent},
 ]
},
{ path: 'register', component: RegisterComponent },
 
  
  {
    path: 'dashbordAdmin', component: DashbordAdminComponent,
    children: [
      { path: "coach", component: CoachComponent },
      { path: "addcoach", component: AddCoachComponent },
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
