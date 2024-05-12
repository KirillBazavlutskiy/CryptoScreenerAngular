import {Component, Input} from "@angular/core";
import {ActiveChapterModel, ActiveOptionsChapter} from "../../../../models/Options/OptionPagesType.model";
import {ChapterSelectorItemComponent} from "../../OptionsUI/ChapterSelectorItem/ChapterSelectorItem.component";
import {AsyncPipe, NgClass} from "@angular/common";

@Component({
  selector: "app-options-chapter-selector-mobile",
  standalone: true,
  imports: [
    ChapterSelectorItemComponent,
    NgClass,
    AsyncPipe
  ],
  templateUrl: "OptionsChapterSelectorMobile.component.html"
})

export class OptionsChapterSelectorMobileComponent {
  @Input() switchActiveOptionsChapterHandler!: (pageName: ActiveOptionsChapter) => void;
  @Input() optionsChapters!: ActiveChapterModel[];
  @Input() isActive!: boolean;
}
