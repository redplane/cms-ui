import {FormControl, FormGroup} from '@angular/forms';

export interface IFormGroupSection {

  //#region Methods

  // Build the section and export it as a form group.
  toFormGroup(): FormGroup;

  // Load the control base on a specific key the section supplies.
  loadControl(key: string): FormControl | null;

  //#endregion

}
