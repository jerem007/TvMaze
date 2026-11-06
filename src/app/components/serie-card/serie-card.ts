import { Component, input } from '@angular/core';
import { ISerieCard } from '../../services/serie-service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-serie-card',
  styleUrl: './serie-card.css',
  templateUrl: './serie-card.html',
})
export class SerieCard {
  serie = input.required<ISerieCard>();
}
