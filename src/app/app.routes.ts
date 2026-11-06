import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { SerieDetail } from './pages/serie-detail/serie-detail';
import { Favorite } from './pages/favorite/favorite';
import { functionalGuardGuard } from './guards/functional-guard-guard';

export const routes: Routes = [
    {path:'', component:Home},
    {path:'favorites', component: Favorite},
    {path:'detail/:id', component: SerieDetail, canActivate: [functionalGuardGuard]}
];
