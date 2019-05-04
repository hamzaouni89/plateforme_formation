import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './general/login/login.component';
import { DashbordAdminComponent } from './general/dashbordAdmin/dashbordAdmin.component';
import { QuizComponent } from './general/dashbordCoach/quiz/quiz.component';
import { CoursComponent } from './general/dashbordCoach/cours/cours.component';
import { TestComponent } from './general/dashbordAdmin/test/test.component';
import { AddtestComponent } from './general/dashbordAdmin/addtest/addtest.component';
import { CandidatComponent } from './general/dashbordAdmin/candidat/candidat.component';
import { CoachComponent } from './general/dashbordAdmin/coach/coach.component';
import { AddCoachComponent } from './general/dashbordAdmin/addcoach/addcoach.component';
import { AddcoursComponent } from './general/dashbordCoach/addcours/addcours.component';
import { DashbordCoachComponent } from './general/dashbordCoach/dashbordCoach.component';
import { AddquizComponent } from './general/dashbordCoach/addquiz/addquiz.component';
import { CandidatsByNiveauComponent } from './general/dashbordCoach/candidats-by-niveau/candidats-by-niveau.component';
import { DashbordCandidatComponent } from './general/dashbordCandidat/dashbordCandidat.component';
import { ProfilCandidatComponent } from './general/dashbordCandidat/profil-candidat/profil-candidat.component';
import { CoursCandidatComponent } from './general/dashbordCandidat/cours-candidat/cours-candidat.component';
import { TestInscriCandidatComponent } from './general/dashbordCandidat/test-inscri-candidat/test-inscri-candidat.component';
import { TestCandidatComponent } from './general/dashbordCandidat/test-candidat/test-candidat.component';
import { RegisterComponent } from './general/register/register.component';
import { NavbarComponent } from './general/navbar/navbar.component';
import { FooterComponent } from './general/footer/footer.component';
import { GeneralComponent } from './general/general.component';
import { HomeComponent } from './general/home/home.component';
import { CantactComponent } from './general/cantact/cantact.component';
import { ChatComponent } from './general/dashbordCandidat/chat/chat.component';
import { AuthGuardService} from './auth/auth.guard';
import { NiveauComponent } from './general/niveau/niveau.component';
const routes: Routes = [
  {path:'', redirectTo:'general', pathMatch:'full'},
  { path : 'general' , component : GeneralComponent,
  children : [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'navbar', component: NavbarComponent },
    { path : 'footer' , component: FooterComponent},
    { path : 'home' , component: HomeComponent},
    { path : 'cantact', component : CantactComponent},
    { path : 'niveau', component : NiveauComponent},
    { path: 'dashbordCoach', component: DashbordCoachComponent,
    children: [
      { path: 'quiz', component: QuizComponent },
      { path: 'addquiz', component: AddquizComponent },
      { path: 'addcours', component: AddcoursComponent },
      { path: 'cours', component: CoursComponent },
      { path: 'candidatByNiveau', component: CandidatsByNiveauComponent },
    ]},
    { path: 'dashbordCandidat', component: DashbordCandidatComponent,
    children: [
      { path: 'profilCandidat', component: ProfilCandidatComponent },
      { path: 'coursCandidat' , component: CoursCandidatComponent},
      { path: 'testInscrit' , component: TestInscriCandidatComponent},
      { path: 'test' , component: TestCandidatComponent},
      { path: 'chat' , component: ChatComponent},
    ]},
    {path: 'dashbordAdmin', component: DashbordAdminComponent,
    children: [
      { path: "coach", component: CoachComponent },
      { path: "addcoach", component: AddCoachComponent },
      { path: 'test', component: TestComponent },
      { path: 'addtest', component: AddtestComponent },
      { path: 'candidat', component: CandidatComponent }, 
    ]},
  ]},



 
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
