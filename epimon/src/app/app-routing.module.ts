import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { AbilityDetailComponent } from './components/ability-detail/ability-detail.component';

const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'pokemon/:name', component: PokemonDetailComponent },
  { path: 'ability/:name', component: AbilityDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
