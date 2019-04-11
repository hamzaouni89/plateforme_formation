import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TestComponent } from './dashbordAdmin/test/test.component';
import { CoursComponent } from './dashbordCoach/cours/cours.component';
import { DashbordCoachComponent } from './dashbordCoach/dashbordCoach.component';
import { QuizComponent } from './dashbordCoach/quiz/quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DashbordAdminComponent } from './dashbordAdmin/dashbordAdmin.component';
import { CoachComponent } from './dashbordAdmin/coach/coach.component';
import { CandidatComponent } from './dashbordAdmin/candidat/candidat.component';
import { AddCoachComponent } from './dashbordAdmin/addcoach/addcoach.component';
import { AddCandidatComponent } from './dashbordAdmin/candidat/addcandidat/addcandidat.component';
import { AddtestComponent } from './dashbordAdmin/addtest/addtest.component';
import { AddcoursComponent } from './dashbordCoach/addcours/addcours.component';
import { AddquizComponent } from './dashbordCoach/addquiz/addquiz.component';
import { CandidatsByNiveauComponent } from './dashbordCoach/candidats-by-niveau/candidats-by-niveau.component';
import { DashbordCandidatComponent } from './dashbordCandidat/dashbordCandidat.component';
import { ProfilCandidatComponent } from './dashbordCandidat/profil-candidat/profil-candidat.component';
import { CoursCandidatComponent } from './dashbordCandidat/cours-candidat/cours-candidat.component';
import { TestInscriCandidatComponent } from './dashbordCandidat/test-inscri-candidat/test-inscri-candidat.component';
import { TestCandidatComponent } from './dashbordCandidat/test-candidat/test-candidat.component';
import { CounterDirective } from './dashbordCandidat/test-inscri-candidat/counter.directive';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    CounterDirective,
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    TestComponent,
    CoursComponent,
    DashbordCoachComponent,
    QuizComponent,
    DashbordAdminComponent,
    CoachComponent,
    CandidatComponent,
    AddCoachComponent,
    AddCandidatComponent,
    AddtestComponent,
    AddcoursComponent,
    AddquizComponent,
    CandidatsByNiveauComponent,
    DashbordCandidatComponent,
    ProfilCandidatComponent,
    CoursCandidatComponent,
    TestInscriCandidatComponent,
    TestCandidatComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
  
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
