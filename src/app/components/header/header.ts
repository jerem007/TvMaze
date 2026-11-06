import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { form, FormField } from '@angular/forms/signals';
import { ISeriesListResponse, SerieService } from '../../services/serie-service';
import { AdultService } from '../../services/adult-service';
import { filter, finalize } from 'rxjs';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  serieService = inject(SerieService);

  adultModeService = inject(AdultService);
  private router = inject(Router);

  private formValues = signal({ search: '' });
  private submitValues = signal({ search: '' });
  private form = form(this.formValues);

  loading = signal(false);
  isHome = signal(this.router.url === '/');
  series = signal<ISeriesListResponse[]>([]);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(event => {
        this.isHome.set(event.urlAfterRedirects === '/');
      });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const search = this.formValues().search.toLowerCase().trim();

    if (!search) return;

    this.submitValues.set({ search });

    this.loading.set(true);

    this.serieService.getSeriesByName(search)
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: series => {
          this.serieService.series.set(
            series.filter(serie =>
              serie.show.name.toLowerCase().includes(search)
            )
          );
        },
        error: (error) => {
          console.error('Erreur lors de la récupération de la série', error)
        }
      });
  }
  toggleAdultMode() {
    const activating = !this.adultModeService.isAuthorized();
    this.adultModeService.toggleAuthorization();

    if (activating) {
      this.router.navigateByUrl('/');
    }
  }

}
