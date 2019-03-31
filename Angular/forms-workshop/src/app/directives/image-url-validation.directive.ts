import {Directive, ElementRef, HostListener} from '@angular/core';
import {NgForm} from '@angular/forms';

@Directive({
  selector: '[appImageUrlValidation]'
})
export class ImageUrlValidationDirective {

  constructor(private elRef: ElementRef, private form: NgForm) { }

  @HostListener('input')
  inputHandle() {
    const element = this.elRef.nativeElement;
    if (element.value.startsWith('http') && element.value.endsWith('.jpg') || element.value.startsWith('.png') ) {
      element.style.borderColor = 'green';
      this.form.control.setErrors(null);
    } else {
      this.form.control.setErrors({image: true});
      element.style.borderColor = 'red';
    }
  }

}
