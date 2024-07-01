import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    typeClass: string = '';
    heightInMeters: number = 0;
    weightInKilograms: number = 0;
    primaryTypeColor: string = '';
    allPokemon: any[] = [];
    currentPokemonIndex: number = 0;
    previousPokemon: any = null;
    nextPokemon: any = null;
    previousPokemonTypeColor: string = '';
    nextPokemonTypeColor: string = '';

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
        private router: Router,
        private pokemonService: PokemonService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const name = params['name'];
            this.loadPokemon(name);
        });
    }

    loadPokemon(name: string): void {
        this.pokemonService.getPokemonDetails(name).subscribe((data) => {
            this.pokemon = data;
            this.heightInMeters = data.height / 10;
            this.weightInKilograms = data.weight / 10;
            this.getSpeciesData(data.species.url);
            this.setTypeClass(data.types[0].type.name);
            this.primaryTypeColor = this.typeColors[data.types[0].type.name];

            this.pokemonService.getAllPokemon().subscribe((allData) => {
                this.allPokemon = allData.map((p: { name: string; }) => p.name);
                this.currentPokemonIndex = this.allPokemon.indexOf(name);
                this.loadAdjacentPokemon();
            });
        });
    }

    loadAdjacentPokemon(): void {
        if (this.currentPokemonIndex > 0) {
            const previousPokemonName = this.allPokemon[this.currentPokemonIndex - 1];
            this.pokemonService.getPokemonDetails(previousPokemonName).subscribe((data) => {
                this.previousPokemon = data;
                this.previousPokemonTypeColor = this.typeColors[data.types[0].type.name] || '#000';
            });
        } else {
            this.previousPokemon = null;
        }

        if (this.currentPokemonIndex < this.allPokemon.length - 1) {
            const nextPokemonName = this.allPokemon[this.currentPokemonIndex + 1];
            this.pokemonService.getPokemonDetails(nextPokemonName).subscribe((data) => {
                this.nextPokemon = data;
                this.nextPokemonTypeColor = this.typeColors[data.types[0].type.name] || '#000';
            });
        } else {
            this.nextPokemon = null;
        }
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

        while (currentChain) {
            evolutions.push(currentChain.species.name);
            currentChain = currentChain.evolves_to.length ? currentChain.evolves_to[0] : null;
        }

        return evolutions;
    }

    setTypeClass(type: string): void {
        this.typeClass = type;
    }

    goToPreviousPokemon(): void {
        if (this.currentPokemonIndex > 0) {
            const previousPokemon = this.allPokemon[this.currentPokemonIndex - 1];
            this.router.navigate(['/pokemon', previousPokemon]);
        }
    }

    goToNextPokemon(): void {
        if (this.currentPokemonIndex < this.allPokemon.length - 1) {
            const nextPokemon = this.allPokemon[this.currentPokemonIndex + 1];
            this.router.navigate(['/pokemon', nextPokemon]);
        }
    }

    goToHome(): void {
        this.router.navigate(['/']);
    }
}