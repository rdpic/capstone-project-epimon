import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { AbilityDetailComponent } from './components/ability-detail/ability-detail.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthService } from './auth/auth.service';
import { QuizService } from './services/quiz.service';
import { PokemonService } from './services/pokemon.service';
import { AuthInterceptor } from './auth/token.interceptor';


@NgModule({
    declarations: [
        AppComponent,
        CapitalizePipe,
        PokemonListComponent,
        PokemonDetailComponent,
        AbilityDetailComponent,
        HomeComponent,
        NavbarComponent,
        FooterComponent,
        QuizComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        AuthService,
        QuizService,
        PokemonService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }