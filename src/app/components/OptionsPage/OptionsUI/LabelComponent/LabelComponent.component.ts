import {Component, Input} from "@angular/core";
import {OptionsInputComponent} from "../OptionsInput/OptionsInput.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-options-label',
  standalone: true,
  imports: [
    OptionsInputComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: 'LabelComponent.component.html'
})

export class LabelComponentComponent<T> {
  @Input() labelText!: string;
  @Input() formObject!: T;
  @Input() key!: keyof T;
}
