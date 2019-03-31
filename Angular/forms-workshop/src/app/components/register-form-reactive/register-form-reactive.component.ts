import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-register-form-reactive',
  templateUrl: './register-form-reactive.component.html',
  styleUrls: ['./register-form-reactive.component.css']
})
export class RegisterFormReactiveComponent implements OnInit {

  areaCodes: string[] = ['+971', '+359', '+972', '+198', '+701'];
  roles: string[] = ['Manager', 'Designer', 'Accounting'];

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
        fullName: ['', [Validators.required, Validators.pattern('[A-Z][a-z]+\\s[A-Z][a-z]+')]],
        email: ['', [Validators.required, Validators.email, Validators.pattern('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')]],
        areaCode: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern('\\d{9}')]],
        role: ['', Validators.required],
        password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{3,16}$')]],
        repeatPassword: ['', Validators.required],
        imageUrl: ['', [Validators.required, this.imageUrlValidator(/http.*(\.png|\.jpg)/i)]]
      }
    );
  }

  imageUrlValidator(regex: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const test = !regex.test(control.value);
      return test ? {'image': true} : null;
    };
  }

  submitForm() {
    console.log(this.form);
    if (!this.form.invalid) {
      this.form.reset();
    }
  }

  get fullName() {
    return this.form.controls.fullName;
  }

  get email() {
    return this.form.controls.email;
  }

  get areaCode() {
    return this.form.controls.areaCode;
  }

  get phoneNumber() {
    return this.form.controls.phoneNumber;
  }

  get role() {
    return this.form.controls.role;
  }

  get password() {
    return this.form.controls.password;
  }

  get repeatPassword() {
    return this.form.controls.repeatPassword;
  }

  get imageUrl() {
    return this.form.controls.imageUrl;
  }
}
