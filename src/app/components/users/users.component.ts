import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/userService';
import { SharedDataService } from 'src/app/services/sharedDataService';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  userCreated: boolean;
  form: any;

  constructor(private service: UserService, private router: Router, private formBuilder: FormBuilder, private sharedData: SharedDataService) {
    this.form = this.formBuilder.group({
      firstName: ['teste', [Validators.required]],
      lastName: ['testando', [Validators.required]],
      document: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      balance: [200, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['teste123', [Validators.required]],
      userType: ['COMMOM'],
    });
    this.userCreated = false;
  }

  onSubmitUser() {
    if (this.form.valid) {
      const user = this.form.value;

      this.service.addUser(user).subscribe((data: any) => {
        if (data.id) {
          this.userCreated = true;
          this.sharedData.setUserData({ id: data.id, ...user });
          this.redirect();
        }
      });
    }
  }

  redirect() {
    this.userCreated ? this.router.navigate(["/transaction"]) : null
  }

  getFieldError(fieldName: string, errorType: string): boolean {
    const control: AbstractControl | null = this.form.get(fieldName);

    return control !== null && control.hasError(errorType) && (control.dirty || control.touched);
  }
}