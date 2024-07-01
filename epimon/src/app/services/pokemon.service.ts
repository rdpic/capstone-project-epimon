import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PokemonService {
    private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
    private abilityUrl = 'https://pokeapi.co/api/v2/ability';
    private speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species';

    constructor(private http: HttpClient) { }

    getPokemonList(limit: number, offset: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
    }

    getPokemonDetails(name: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${name}`);
    }

    getPokemonSpecies(name: string): Observable<any> {
        return this.http.get<any>(`${this.speciesUrl}/${name}`);
    }

    getPokemonTypes(): Observable<any> {
        return this.http.get<any>('https://pokeapi.co/api/v2/type');
    }

    getPokemonByType(type: string): Observable<any> {
        return this.http.get<any>(`https://pokeapi.co/api/v2/type/${type}`);
    }

    getPokemonByGeneration(generation: number): Observable<any> {
        return this.http.get<any>(`https://pokeapi.co/api/v2/generation/${generation}`);
    }

    getPokemonSpeciesFromUrl(url: string): Observable<any> {
        return this.http.get<any>(url);
    }

    getEvolutionChainFromUrl(url: string): Observable<any> {
        return this.http.get<any>(url);
    }

    getAbilityDetails(name: string): Observable<any> {
        return this.http.get<any>(`${this.abilityUrl}/${name}`);
    }

    getAllPokemon(): Observable<any> {
        const allPokemon: any[] = [];
        const limit = 100;
        let offset = 0;
        let moreData = true;

        return new Observable((observer) => {
            const fetchData = () => {
                this.http.get<any>(`${this.apiUrl}?limit=${limit}&offset=${offset}`).subscribe((data) => {
                    allPokemon.push(...data.results);
                    offset += limit;
                    moreData = data.next !== null;

                    if (moreData) {
                        fetchData();
                    } else {
                        observer.next(allPokemon);
                        observer.complete();
                    }
                });
            };

            fetchData();
        });
    }
}