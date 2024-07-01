import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
    selector: 'app-ability-detail',
    templateUrl: './ability-detail.component.html',
    styleUrls: ['./ability-detail.component.css']
})
export class AbilityDetailComponent implements OnInit {
    ability: any;
    abilityName: string = '';
    description: string = '';
    pokemonList: any[] = [];
    typeColors: { [key: string]: string } = {
        grass: '#78C850',
        poison: '#A040A0',
        fire: '#F08030',
        water: '#6890F0',
        bug: '#A8B820',
        normal: '#A8A878',
        electric: '#F8D030',
        ground: '#E0C068',
        fairy: '#EE99AC',
        fighting: '#C03028',
        psychic: '#F85888',
        rock: '#B8A038',
        ghost: '#705898',
        ice: '#98D8D8',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        flying: '#A890F0'
    };

    constructor(
        private route: ActivatedRoute,
        private pokemonService: PokemonService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.abilityName = params['name'];
            this.pokemonService.getAbilityDetails(this.abilityName).subscribe((data) => {
                this.ability = data;
                this.description = data.effect_entries.find((entry: { language: { name: string; }; }) => entry.language.name === 'en')?.effect || 'No description available';

                const requests: Observable<any>[] = data.pokemon.map((p: { pokemon: { name: string; }; }) =>
                    this.pokemonService.getPokemonDetails(p.pokemon.name)
                );

                forkJoin(requests).subscribe((pokemonDetails) => {
                    this.pokemonList = pokemonDetails.map((pokemon: any) => {
                        const primaryType = pokemon.types[0].type.name;
                        return {
                            name: pokemon.name,
                            primaryType: primaryType,
                            primaryTypeColor: this.typeColors[primaryType] || '#000'
                        };
                    });
                }, error => {
                    console.error('Error fetching Pokémon details:', error);
                });
            }, error => {
                console.error('Error fetching ability details:', error);
            });
        });
    }
}
