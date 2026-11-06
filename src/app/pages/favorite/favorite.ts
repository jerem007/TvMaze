import { Component, inject } from '@angular/core';
import { SerieCard } from '../../components/serie-card/serie-card';
import { Favorite as FavoriteService } from '../../services/favorite';

@Component({
  imports: [SerieCard],
  selector: 'app-favorite',
  styleUrl: './favorite.css',
  templateUrl: './favorite.html',
})
export class Favorite {
  favoriteService = inject(FavoriteService);
  favorites = this.favoriteService.favorites;
}
