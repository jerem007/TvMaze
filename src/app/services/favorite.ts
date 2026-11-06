import {Service, signal } from '@angular/core';
import { ISerieCard } from './serie-service';

@Service()
export class Favorite {

  favorites = signal<ISerieCard[]>(this.loadFavorites());

  // Récupérer les favoris au démarrage
  private loadFavorites(): ISerieCard[] {
    const savedFavorites = localStorage.getItem('favorites');

    if (!savedFavorites) return [];

    const favorites = JSON.parse(savedFavorites) as ISerieCard[];
    return favorites.map(({ id, name, image }) => ({ id, name, image }));
  }

  // Sauvegarder les favoris
  private saveFavorites() {
    const favorites = this.favorites().map(({ id, name, image }) => ({ id, name, image }));
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  addFavorite(serie: ISerieCard) {
    if (this.isFavorite(serie.id)) return;

    const card: ISerieCard = {
      id: serie.id,
      name: serie.name,
      image: serie.image,
    };

    this.favorites.update(favorites => [...favorites, card]);
    this.saveFavorites();
  }

  removeFavorite(id: number) {
    this.favorites.update(favorites =>
      favorites.filter(serie => serie.id !== id)
    );

    this.saveFavorites();
  }

  isFavorite(id: number) {
    return this.favorites().some(serie => serie.id === id);
  }

  toggleFavorite(serie: ISerieCard) {
    if (this.isFavorite(serie.id)) {
      this.removeFavorite(serie.id);
    } else {
      this.addFavorite(serie);
    }
  }
}
