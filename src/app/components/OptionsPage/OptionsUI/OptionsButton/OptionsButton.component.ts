import {Component, Input} from "@angular/core";

@Component({
  selector: "app-options-button",
  standalone: true,
  template: `
    <button
      class="text-white transition-colors bg-blue-600 hover:bg-blue-700 rounded-lg px-[40px] py-[6px]"
      (click)="clickHandler()"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class OptionsButtonComponent {
  @Input() clickHandler!: () => void;
}
