import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
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

    constructor(private pokemonService: PokemonService) { }

    ngOnInit(): void {
        this.getAllPokemon();
        this.getPokemonTypes();
    }

    getAllPokemon(): void {
        this.pokemonService.getAllPokemon().subscribe({
            next: (data) => {
                if (!data || !Array.isArray(data)) {
                    console.error('Invalid data format:', data);
                    return;
                }
                const requests = data.map((pokemon: { name: string }) => this.pokemonService.getPokemonDetails(pokemon.name));
                forkJoin(requests).subscribe({
                    next: (pokemonDetails: any[]) => {
                        this.pokemonList = pokemonDetails.map((pokemon: any) => {
                            if (!pokemon.types || !Array.isArray(pokemon.types) || !pokemon.types[0]) {
                                console.error('Invalid Pokemon data:', pokemon);
                                return null;
                            }
                            return {
                                name: pokemon.name,
                                sprite: pokemon.sprites.front_default,
                                primaryType: pokemon.types[0].type.name,
                                primaryTypeColor: this.typeColors[pokemon.types[0].type.name] || '#000'
                            };
                        }).filter(Boolean);
                        this.applyFilters();
                    },
                    error: (err) => {
                        console.error('Error fetching Pokemon details:', err);
                    }
                });
            },
            error: (err) => {
                console.error('Error fetching all Pokemon:', err);
            }
        });
    }

    getPokemonTypes(): void {
        this.pokemonService.getPokemonTypes().subscribe({
            next: (data) => {
                this.pokemonTypes = data.results;
            },
            error: (err) => {
                console.error('Error fetching Pokemon types:', err);
            }
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
            this.pokemonService.getPokemonByType(this.selectedType).subscribe({
                next: (data) => {
                    if (!data || !Array.isArray(data.pokemon)) {
                        console.error('Invalid type data format:', data);
                        return;
                    }
                    const typePokemonNames = data.pokemon.map((p: { pokemon: { name: any; }; }) => p.pokemon.name);
                    filtered = filtered.filter(pokemon => typePokemonNames.includes(pokemon.name));
                    this.applySearchFilter(filtered);
                },
                error: (err) => {
                    console.error('Error fetching Pokemon by type:', err);
                }
            });
        } else {
            this.applySearchFilter(filtered);
        }
    }

    applySearchFilter(filteredList: any[] = this.pokemonList): void {
        if (this.selectedGeneration) {
            this.pokemonService.getPokemonByGeneration(this.selectedGeneration).subscribe({
                next: (data) => {
                    if (!data || !Array.isArray(data.pokemon_species)) {
                        console.error('Invalid generation data format:', data);
                        return;
                    }
                    const generationPokemonNames = data.pokemon_species.map((species: { name: any; }) => species.name);
                    filteredList = filteredList.filter(pokemon => generationPokemonNames.includes(pokemon.name));
                    this.filteredList = filteredList.filter(pokemon =>
                        pokemon.name.toLowerCase().includes(this.searchText.toLowerCase())
                    );
                },
                error: (err) => {
                    console.error('Error fetching Pokemon by generation:', err);
                }
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