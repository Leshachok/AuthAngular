import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() navBarTmpl: TemplateRef<any>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignOut(){
    this.authService.logout
  }

}
