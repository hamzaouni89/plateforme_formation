import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './general/navbar/navbar.component';
import { FooterComponent } from './general/footer/footer.component';
import { LoginComponent } from './general/login/login.component';
import { RegisterComponent } from './general/register/register.component';
import { TestComponent } from './general/dashbordAdmin/test/test.component';
import { CoursComponent } from './general/dashbordCoach/cours/cours.component';
import { DashbordCoachComponent } from './general/dashbordCoach/dashbordCoach.component';
import { QuizComponent } from './general/dashbordCoach/quiz/quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DashbordAdminComponent } from './general/dashbordAdmin/dashbordAdmin.component';
import { CoachComponent } from './general/dashbordAdmin/coach/coach.component';
import { CandidatComponent } from './general/dashbordAdmin/candidat/candidat.component';
import { AddCoachComponent } from './general/dashbordAdmin/addcoach/addcoach.component';
import { AddtestComponent } from './general/dashbordAdmin/addtest/addtest.component';
import { AddcoursComponent } from './general/dashbordCoach/addcours/addcours.component';
import { AddquizComponent } from './general/dashbordCoach/addquiz/addquiz.component';
import { CandidatsByNiveauComponent } from './general/dashbordCoach/candidats-by-niveau/candidats-by-niveau.component';
import { DashbordCandidatComponent } from './general/dashbordCandidat/dashbordCandidat.component';
import { ProfilCandidatComponent } from './general/dashbordCandidat/profil-candidat/profil-candidat.component';
import { CoursCandidatComponent } from './general/dashbordCandidat/cours-candidat/cours-candidat.component';
import { TestInscriCandidatComponent } from './general/dashbordCandidat/test-inscri-candidat/test-inscri-candidat.component';
import { TestCandidatComponent } from './general/dashbordCandidat/test-candidat/test-candidat.component';
import { CounterDirective } from './general/dashbordCandidat/test-inscri-candidat/counter.directive';
import { HomeComponent } from './general/home/home.component';
import { GeneralComponent } from './general/general.component';
import { CantactComponent } from './general/cantact/cantact.component';
import { ChatComponent } from './general/dashbordCandidat/chat/chat.component';
import { AuthGuardService} from './auth/auth.guard';
import { UserService } from './service/user.service';
import { ChatService } from './service/chat.service';
import { NiveauComponent } from './general/niveau/niveau.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FilterPipe } from './service/filter.pipe';
 
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
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
    AddtestComponent,
    AddcoursComponent,
    AddquizComponent,
    CandidatsByNiveauComponent,
    DashbordCandidatComponent,
    ProfilCandidatComponent,
    CoursCandidatComponent,
    TestInscriCandidatComponent,
    TestCandidatComponent,
    HomeComponent,
    GeneralComponent,
    CantactComponent,
    ChatComponent,
    NiveauComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule
  ],
  providers: [AuthGuardService, UserService , ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
