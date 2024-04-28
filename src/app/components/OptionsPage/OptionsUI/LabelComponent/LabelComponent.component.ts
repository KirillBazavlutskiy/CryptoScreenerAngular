import {Component, Input} from "@angular/core";

@Component({
  selector: 'app-options-label',
  standalone: true,
  templateUrl: 'LabelComponent.component.html'
})

export class LabelComponentComponent {
  @Input() labelText!: string;
  @Input() value!: number;
  @Input() updateFunc!: (value: number) => void;

  onInputChange(event: any) {
    this.updateFunc(event.target.value)
  }
}
