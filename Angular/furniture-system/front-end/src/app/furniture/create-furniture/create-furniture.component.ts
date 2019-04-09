import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FurnitureService} from '../furniture.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-furniture',
  templateUrl: './create-furniture.component.html',
  styleUrls: ['./create-furniture.component.css']
})
export class CreateFurnitureComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private furnitureService: FurnitureService, private router: Router) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      make: ['', [Validators.required, Validators.minLength(4) ]],
      model: ['', [Validators.required, Validators.minLength(4) ]],
      year: ['', [Validators.required, Validators.min(1950), Validators.max(2050) ]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      image: ['', [Validators.required]],
      material: [''],
    });
  }

  submitForm() {
    this.furnitureService.addFurniture(this.form.value)
      .subscribe(result => {
        console.log(result);
        this.router.navigate(['furniture', 'all']);
      });
  }

  get make() {
    return this.form.controls.make;
  }
  get model() {
    return this.form.controls.model;
  }
  get year() {
    return this.form.controls.year;
  }
  get description() {
    return this.form.controls.description;
  }
  get price() {
    return this.form.controls.price;
  }
  get image() {
    return this.form.controls.image;
  }
  get material() {
    return this.form.controls.material;
  }

}
