import {Component, Input} from "@angular/core";
import {ActiveOptionsChapter} from "../../../../models/Options/OptionPagesType.model";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: "app-options-chapter-selector-item",
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: "ChapterSelectorItem.component.html"
})

export class ChapterSelectorItemComponent {
  @Input() isMobile!: boolean;
  @Input() buttonText!: string;
  @Input() switchActivePageClickHandler!: (pageName: ActiveOptionsChapter) => void;
  @Input() pageKey!: ActiveOptionsChapter;
}
