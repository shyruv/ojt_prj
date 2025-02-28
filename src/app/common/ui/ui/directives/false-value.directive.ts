import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appFalseValueValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: FalseValueDirective, multi: true }]
})
export class FalseValueDirective implements Validator {

  validate(control: FormControl): { [key: string]: any } | null {
    if (control.value) {
        return {trueValue: true};
    }

    return null;
  }
}
