import {Component, Input} from "@angular/core";
import {PaintingBreakpoint} from "../../../../../models/Options/StylingOptions.model";

@Component({
  selector: "app-options-create-new-paint-breakpoint-button",
  standalone: true,
  template: `
    <button
      (click)="addNewPaintBreakpointClickHandler()"
      class="px-[10px] py-[4px] bg-gray-500/20 hover:bg-gray-500/40 text-white transition-colors rounded-lg"
    >Add New</button>
  `
})

export class CreateNewPaintBreakpointButtonComponent {
  @Input() currentBreakpointsList!: PaintingBreakpoint[];
  addNewPaintBreakpointClickHandler = () => {
    this.currentBreakpointsList.push({
      value: Number(this.currentBreakpointsList[this.currentBreakpointsList.length - 1].value) + 1,
      color: "#ccc"
    })
  }
}
