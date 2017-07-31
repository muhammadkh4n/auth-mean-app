import { Component, OnInit } from '@angular/core';
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

  constructor(private validateService: ValidateService) { }

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
      console.log('Fill in all fields');
      return false;
    }

    // Email Validate
    if (!this.validateService.validateEmail(user.email)) {
      console.log('Use a valid email');
      return false;
    }
  }

}
