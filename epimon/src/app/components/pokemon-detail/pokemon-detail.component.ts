import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
    selector: 'app-pokemon-detail',
    templateUrl: './pokemon-detail.component.html',
    styleUrls: ['./pokemon-detail.component.css']
})

export class PokemonDetailComponent implements OnInit {
    pokemon: any;
    evolutionChain: any[] = [];
    species: any;
    description: string = '';
    category: string = '';

    constructor(
        private route: ActivatedRoute,
        private pokemonService: PokemonService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const name = params['name'];
            this.pokemonService.getPokemonDetails(name).subscribe((data) => {
                this.pokemon = data;
                this.getSpeciesData(data.species.url);
            });
        });
    }

    getSpeciesData(url: string): void {
        this.pokemonService.getPokemonSpeciesFromUrl(url).subscribe((data) => {
            this.species = data;
            this.category = data.genera.find((genus: { language: { name: string; }; }) => genus.language.name === 'en').genus;
            this.description = data.flavor_text_entries.find((entry: { language: { name: string; }; }) => entry.language.name === 'en').flavor_text.replace(/\n/g, ' ');
            this.getEvolutionChain(data.evolution_chain.url);
        });
    }

    getEvolutionChain(url: string): void {
        this.pokemonService.getEvolutionChainFromUrl(url).subscribe((data) => {
            this.evolutionChain = this.extractEvolutions(data.chain);
        });
    }

    extractEvolutions(chain: any): any[] {
        const evolutions = [];
        let currentChain = chain;

        while (currentChain && currentChain.evolves_to.length) {
            evolutions.push(currentChain.species.name);
            currentChain = currentChain.evolves_to[0];
        }

        return evolutions;
    }
}
