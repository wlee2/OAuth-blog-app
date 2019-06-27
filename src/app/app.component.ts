import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from './store/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OAuth-blog-app';

  constructor(private store: Store<{ user: string }>){
    if(localStorage.getItem('userName')){
      this.store.dispatch(login({name: localStorage.getItem('userName'), picture: localStorage.getItem('user_picture'), url: localStorage.getItem('user_url')}))
    }
  }
}
