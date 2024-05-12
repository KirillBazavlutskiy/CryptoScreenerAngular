import {Component, Input} from "@angular/core";
import {PaintingBreakpoint} from "../../../../../models/Options/StylingOptions.model";
import {NgForOf} from "@angular/common";
import {OptionsInputComponent} from "../../../OptionsUI/OptionsInput/OptionsInput.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: "app-options-styling-breakpoints-container",
  standalone: true,
  imports: [
    NgForOf,
    OptionsInputComponent,
    FormsModule
  ],
  templateUrl: "StylingBreakpointsContainer.component.html"
})

export class StylingBreakpointsContainerComponent {
  @Input() stylingBreakpoint!: PaintingBreakpoint[];
}
