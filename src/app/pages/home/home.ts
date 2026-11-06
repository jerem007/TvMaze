import { Component, inject } from '@angular/core';
import { SerieCard } from '../../components/serie-card/serie-card';
import { SerieService } from '../../services/serie-service';

@Component({
  imports: [SerieCard],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  service = inject(SerieService)
  series = this.service.series;
}
