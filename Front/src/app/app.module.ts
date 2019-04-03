import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TestComponent } from './dashbord/test/test.component';
import { CoursComponent } from './profil/cours/cours.component';
import { ProfilComponent } from './profil/profil.component';
import { QuizComponent } from './profil/quiz/quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DashbordComponent } from './dashbord/dashbord.component';
import { CoachComponent } from './dashbord/coach/coach.component';
import { CandidatComponent } from './dashbord/candidat/candidat.component';
import { AddcoachComponent } from './dashbord/addcoach/addcoach.component';
import { AddCandidatComponent } from './dashbord/candidat/addcandidat/addcandidat.component';
import { AddtestComponent } from './dashbord/addtest/addtest.component';
import { AddcoursComponent } from './profil/addcours/addcours.component';
import { AddquizComponent } from './profil/addquiz/addquiz.component';
import { CandidatsByNiveauComponent } from './profil/candidats-by-niveau/candidats-by-niveau.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    TestComponent,
    CoursComponent,
    ProfilComponent,
    QuizComponent,
    DashbordComponent,
    CoachComponent,
    CandidatComponent,
    AddcoachComponent,
    AddCandidatComponent,
    AddtestComponent,
    AddcoursComponent,
    AddquizComponent,
    CandidatsByNiveauComponent
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
