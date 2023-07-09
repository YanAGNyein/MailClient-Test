import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AutocompleteService {
  filterOptions: Observable<any[]>;

  constructor() {}

  // tslint:disable: triple-equals
  public validateSelectedValue(
    formControlName: string,
    options: any[],
    optionFiled: string,
    taskForm: FormGroup,
    onSelectFunction?:(formControlName:string)=>void
  ): void {
    setTimeout(() => {
      if (!options) {
        return;
      }
      const formControl = taskForm.get(formControlName);
      let item;
      options.map((i) => {
        if (i[optionFiled] == formControl.value) {
          item = i[optionFiled] == formControl.value;
        }
        else if(formControl.value&&i[optionFiled]==formControl.value[optionFiled])
        {
          item = i[optionFiled]==formControl.value[optionFiled];
        }
      });
      if (!item) {
        formControl.setValue(null);
        if(onSelectFunction)
        {
          onSelectFunction(formControlName);
        }
      }
    }, 1000);
  }
  public initializationFilterAutoComplete(
    formControlName: string,
    options: any[],
    optionFiled: string,
    taskForm: FormGroup
  ): void {
    const formControl = taskForm.get(formControlName);
    this.filterOptions = formControl.valueChanges.pipe(
      startWith(formControl.value),
      map((value) => this._filter(value, options, optionFiled))
    );
  }

  private _filter(
    value: {} | string,
    options: any[],
    optionFiled: string
  ): string[] {
    if (value) {
      let filterValue;
      if (typeof value === "string") {
        filterValue = value.toLowerCase();
      } else {
        filterValue = value[optionFiled].toLowerCase();
      }
      return options.filter((option) =>
        option[optionFiled].toLowerCase().includes(filterValue)
      );
    } else {
      return options;
    }
  }
}
