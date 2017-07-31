import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ValidateService } from '../../services/validate.service';

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
              private flashMessage: FlashMessagesService) { }

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
  }

}
