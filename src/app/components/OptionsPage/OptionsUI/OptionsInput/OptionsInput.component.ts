import {Component, forwardRef, Input} from "@angular/core";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NgClass} from "@angular/common";
import {InputType} from "node:zlib";

@Component({
  selector: "app-options-input",
  template: `
    <input
      [ngModel]="value"
      (ngModelChange)="onChange($event)"
      [type]="inputType"
      class="bg-transparent text-white border-[1px] rounded-md border-gray-500 text-sm focus:bg-gray-100/10 transition-colors"
      [ngClass]="{
        'p-0 w-[40px]': inputType === 'color',
        'w-full usm:w-auto px-[6px] py-[2px]': inputType !== 'color'
      }"
    >
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OptionsInputComponent),
      multi: true,
    },
  ],
  imports: [
    FormsModule,
    NgClass
  ],
  standalone: true
})
export class OptionsInputComponent implements ControlValueAccessor {
  @Input() inputType!: InputType;

  value: any;
  onChange: any = () => {};
  onTouch: any = () => {};
  disabled = false;

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
