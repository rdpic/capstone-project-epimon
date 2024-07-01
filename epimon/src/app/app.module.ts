import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { AbilityDetailComponent } from './components/ability-detail/ability-detail.component';


@NgModule({
    declarations: [
        AppComponent,
        CapitalizePipe,
        PokemonListComponent,
        PokemonDetailComponent,
        AbilityDetailComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }