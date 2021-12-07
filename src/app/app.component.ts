import { Component, OnInit } from '@angular/core';

import { AuthService } from './core/services/auth.service';
import { LoadingService } from './core/services/loading.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  isLoading: boolean;

  constructor(
              private authService: AuthService,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
    

    this.loadingService.getLoadingState()
      .subscribe((isLoading: boolean) => this.isLoading = isLoading);

    console.log('Username from token', this.authService.getUserName());
  }
}
