import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'input[moveNextByMaxLength], textarea[moveNextByMaxLength]',
})
export class MoveNextByMaxLengthDirective {
  @HostListener('keyup', ['$event']) onKeyDown(keyboardEvent: KeyboardEvent) {
    const target = keyboardEvent.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;

    

    if (!target || target.maxLength !== target.value.length) return;

    if (keyboardEvent.key === "Backspace") {
      console.log("HEY");
    }

    keyboardEvent.preventDefault();

    const { type } = target;
    let { nextElementSibling } = target;

    while (nextElementSibling) {
      if (
        (nextElementSibling as HTMLInputElement | HTMLTextAreaElement).type ===
        type
      ) {
        (nextElementSibling as HTMLInputElement | HTMLTextAreaElement).value = "";
        (nextElementSibling as HTMLInputElement | HTMLTextAreaElement).focus();
        return;
      }

      nextElementSibling = nextElementSibling.nextElementSibling;
    }
  }
}