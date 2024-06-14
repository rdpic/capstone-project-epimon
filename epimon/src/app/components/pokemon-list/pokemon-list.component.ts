import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
    selector: 'app-pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.css']
})

export class PokemonListComponent implements OnInit {
    pokemonList: any[] = [];
    filteredList: any[] = [];
    pokemonTypes: any[] = [];
    generations: any[] = [
        { id: 1, name: 'Generation I' },
        { id: 2, name: 'Generation II' },
        { id: 3, name: 'Generation III' },
        { id: 4, name: 'Generation IV' },
        { id: 5, name: 'Generation V' },
        { id: 6, name: 'Generation VI' },
        { id: 7, name: 'Generation VII' },
        { id: 8, name: 'Generation VIII' },
        { id: 9, name: 'Generation IX' },
    ];
    limit: number = 20;
    offset: number = 0;
    searchText: string = '';
    selectedType: string = '';
    selectedGeneration!: number;

    constructor(private pokemonService: PokemonService) { }

    ngOnInit(): void {
        this.getAllPokemon();
        this.getPokemonTypes();
    }

    getAllPokemon(): void {
        this.pokemonService.getAllPokemon().subscribe((data) => {
            this.pokemonList = data;
            this.applyFilters();
        });
    }

    getPokemonTypes(): void {
        this.pokemonService.getPokemonTypes().subscribe((data) => {
            this.pokemonTypes = data.results;
        });
    }

    filterByType(): void {
        this.applyFilters();
    }

    filterByGeneration(): void {
        this.applyFilters();
    }

    applyFilters(): void {
        let filtered = this.pokemonList;

        if (this.selectedType) {
            this.pokemonService.getPokemonByType(this.selectedType).subscribe((data) => {
                const typePokemonNames = data.pokemon.map((p: { pokemon: { name: any; }; }) => p.pokemon.name);
                filtered = filtered.filter(pokemon => typePokemonNames.includes(pokemon.name));
                this.applySearchFilter(filtered);
            });
        } else {
            this.applySearchFilter(filtered);
        }
    }

    applySearchFilter(filteredList: any[] = this.pokemonList): void {
        if (this.selectedGeneration) {
            this.pokemonService.getPokemonByGeneration(this.selectedGeneration).subscribe((data) => {
                const generationPokemonNames = data.pokemon_species.map((species: { name: any; }) => species.name);
                filteredList = filteredList.filter(pokemon => generationPokemonNames.includes(pokemon.name));
                this.filteredList = filteredList.filter(pokemon =>
                    pokemon.name.toLowerCase().includes(this.searchText.toLowerCase())
                );
            });
        } else {
            this.filteredList = filteredList.filter(pokemon =>
                pokemon.name.toLowerCase().includes(this.searchText.toLowerCase())
            );
        }
    }

    filteredPokemonList(): any[] {
        return this.filteredList;
    }

}
