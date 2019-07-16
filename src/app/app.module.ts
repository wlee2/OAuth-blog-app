import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import * as secret from 'secret';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule, MatExpansionModule, MatButtonModule, MatToolbarModule, MatCardModule, MatSidenavModule, MatIconModule, MatListModule, MatSnackBarModule, MatProgressSpinnerModule, MatInputModule, MatStepperModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CookieService } from 'ngx-cookie-service';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BlogComponent } from './blog/blog.component';
import { StoreModule } from '@ngrx/store';
import * as userStore from './store/user.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { WriteReviewComponent } from './write-review/write-review.component';
import { RatingModule } from 'ng-starrating';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    BlogComponent,
    PageNotFoundComponent,
    WriteReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatInputModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    StoreModule.forRoot({
      user: userStore.reducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    DragDropModule,
    AgmCoreModule.forRoot({
      apiKey: secret.mapKey
    }),
    RatingModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
