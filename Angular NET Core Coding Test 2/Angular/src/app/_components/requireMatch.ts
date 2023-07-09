import { AbstractControl } from '@angular/forms';

export function RequireMatch(control: AbstractControl) {
    const selection: any = control.value;
    //console.log ("type="+typeof selection);
    //XL the autocomplete selection is object, if user addon some char, it will become string type
    //So we can block user put any string other than the selection.
    if (typeof selection === 'string') {
        return { incorrect: true };
    }
    return null;
}