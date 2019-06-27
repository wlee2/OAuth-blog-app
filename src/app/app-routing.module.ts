import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { AuthGuard } from './services/auth.guard';
import { BlogContentsComponent } from './blog-contents/blog-contents.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BlogMainComponent } from './blog-main/blog-main.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'blog', component: BlogComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'view/:id', component: BlogContentsComponent, outlet: 'blogOutlet'
      },
      {
        path: '', component: BlogMainComponent, outlet: 'blogOutlet'
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
