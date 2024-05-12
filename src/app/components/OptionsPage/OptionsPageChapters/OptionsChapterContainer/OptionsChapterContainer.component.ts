import {Component, Input} from "@angular/core";
import {ActiveOptionsChapter} from "../../../../models/Options/OptionPagesType.model";
import {
  SolidityFinderSettingsChapterComponent
} from "../SolidityFinderSettingsChapter/SolidityFinderSettingsChapter.component";
import {
  SolidityTicketCardSettingsChapterContainerComponent
} from "../SolidityTicketCardSettingsChapter/SolidityTicketCardSettingsChapterContainer/SolidityTicketCardSettingsChapterContainer.component";
import {NgClass} from "@angular/common";

@Component({
  selector: "app-options-chapter-container",
  standalone: true,
  imports: [
    SolidityFinderSettingsChapterComponent,
    SolidityTicketCardSettingsChapterContainerComponent,
    NgClass
  ],
  templateUrl: "OptionsChapterContainer.component.html"
})

export class OptionsChapterContainerComponent {
  @Input() activeOptionChapter!: ActiveOptionsChapter;
}
