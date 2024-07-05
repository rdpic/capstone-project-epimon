import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { AbilityDetailComponent } from './components/ability-detail/ability-detail.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'pokedex', component: PokemonListComponent },
    { path: 'pokemon/:name', component: PokemonDetailComponent },
    { path: 'ability/:name', component: AbilityDetailComponent },
    { path: 'quiz', component: QuizComponent , canActivate: [AuthGuard]},
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegisterComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }