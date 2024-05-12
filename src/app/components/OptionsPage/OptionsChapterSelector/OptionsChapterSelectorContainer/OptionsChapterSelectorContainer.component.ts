import {Component, Input} from "@angular/core";
import {ActiveChapterModel, ActiveOptionsChapter} from "../../../../models/Options/OptionPagesType.model";
import {ChapterSelectorItemComponent} from "../../OptionsUI/ChapterSelectorItem/ChapterSelectorItem.component";

@Component({
  selector: "app-options-chapter-selector-container",
  standalone: true,
  imports: [
    ChapterSelectorItemComponent
  ],
  templateUrl: "OptionsChapterSelectorContainer.component.html"
})

export class OptionsChapterSelectorContainerComponent {
  @Input() switchActiveOptionsChapterHandler!: (pageName: ActiveOptionsChapter) => void;
  @Input() optionsChapters!: ActiveChapterModel[];
}
