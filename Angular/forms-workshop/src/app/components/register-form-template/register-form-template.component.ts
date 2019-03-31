import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-register-form-template',
  templateUrl: './register-form-template.component.html',
  styleUrls: ['./register-form-template.component.css']
})
export class RegisterFormTemplateComponent implements OnInit {

  areaCodes: string[] = ['+971', '+359', '+972', '+198', '+701'];
  roles: string[] = ['Manager', 'Designer', 'Accounting'];

  @ViewChild('form')
  htmlForm;

  constructor() { }

  submitForm() {
    if (!this.htmlForm.invalid) {
      this.htmlForm.reset();
    }
  }

  ngOnInit() {
  }

}
