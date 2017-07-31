import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private auth: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  loginUser() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.auth.authenticateUser(user)
      .subscribe(data => {
        if (data.success) {
          this.auth.storeUser(data.token, data.user);
          this.flashMessage.show('Login Successful', {
            cssClass: 'alert-success',
            timeout: 5000
          });
          this.router.navigate(['dashboard']);
        } else {
          this.flashMessage.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 5000
          });
          this.router.navigate(['login']);
        }
      });
  }

}
