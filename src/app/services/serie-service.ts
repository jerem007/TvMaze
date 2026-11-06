import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';

export interface ISeriesListResponse {
  score: number;
  show: ISerieCard;
}

export interface ISerieCard {
    id: number
    name: string,
    image: {
        medium: string;
        original: string;
    }
}
interface IEpisode {
    id: number,
    season: number,
    name: string,
    number: number
}
export interface ISerieDetailWithEpisodes {
    id:number,
    name: string,
    image: {
        medium: string;
        original: string;
    },
    summary: string,
    status: string,
    _embedded: {
        episodes: IEpisode[];
    }
}
@Service()
export class SerieService {
    private http = inject(HttpClient)
    apiUrl = 'https://api.tvmaze.com'

    series = signal<ISeriesListResponse[]>([]);

    getSeriesByName(name:string) : Observable<ISeriesListResponse[]>{
        return this.http.get<ISeriesListResponse[]>(`${this.apiUrl}/search/shows?q=${encodeURIComponent(name)}`)
    }
    getSeriesDetail(id: number) {
        return this.http.get<ISerieDetailWithEpisodes>(`${this.apiUrl}/shows/${id}?embed=episodes`)
    }

}
