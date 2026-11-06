import { Component, inject, input, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { SerieService, type ISerieDetailWithEpisodes } from '../../services/serie-service';
import { Favorite } from '../../services/favorite';

@Component({
  imports: [],
  selector: 'app-serie-detail',
  styleUrl: './serie-detail.css',
  templateUrl: './serie-detail.html',
})
export class SerieDetail implements OnInit {
  serieService = inject(SerieService);
  favoriteService = inject(Favorite);
  id = input<number>();

  serie = signal<ISerieDetailWithEpisodes | null>(null);
  
  loading = signal(true);

  ngOnInit() {
    this.serieService.getSeriesDetail(this.id()!)
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: data => this.serie.set(data),
        error: (err) => console.log('Erreur lors de la récupération des séries', err),
      });
  }
}
