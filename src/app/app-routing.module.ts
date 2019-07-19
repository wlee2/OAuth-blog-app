import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WriteReviewComponent } from './write-review/write-review.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'write', component: WriteReviewComponent,
    canActivate: [AuthGuard],
    children: [
    ]
  },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
