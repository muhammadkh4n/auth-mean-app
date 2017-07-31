import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String
  username: String
  email: String
  password: String
  // confirmPassword: String

  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Fill in all fields', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    }

    // Email Validate
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Invalid email', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    }

    // Register User
    this.auth.registerUser(user)
      .subscribe(data => {
        if (data.success) {
          this.flashMessage.show('Registration Successful, You can login now.', {
            cssClass: 'alert-success',
            timeout: 3000
          });
          this.router.navigate(['/login']);
        } else {
          this.flashMessage.show('Something went wrong', {
            cssClass: 'alert-danger',
            timeout: 3000
          });
          this.router.navigate(['/register']);
        }
      });
  }

}
