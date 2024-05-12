import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {StoreModel} from "../../../store/Store.model";
import {Observable} from "rxjs";
import {ActivePagesModel} from "../../../store/ActivePage/ActivePages.model";
import {AsyncPipe, NgClass, NgOptimizedImage} from "@angular/common";
import {switchOptionsPageAction} from "../../../store/ActivePage/ActivePages.actions";
import {
  SolidityFinderSettingsChapterComponent
} from "../OptionsPageChapters/SolidityFinderSettingsChapter/SolidityFinderSettingsChapter.component";
import {
  SolidityTicketCardSettingsChapterContainerComponent
} from "../OptionsPageChapters/SolidityTicketCardSettingsChapter/SolidityTicketCardSettingsChapterContainer/SolidityTicketCardSettingsChapterContainer.component";
import {ChapterSelectorItemComponent} from "../OptionsUI/ChapterSelectorItem/ChapterSelectorItem.component";
import {ActiveChapterModel, ActiveOptionsChapter} from "../../../models/Options/OptionPagesType.model";
import {
  OptionsChapterContainerComponent
} from "../OptionsPageChapters/OptionsChapterContainer/OptionsChapterContainer.component";
import {
  OptionsChapterSelectorContainerComponent
} from "../OptionsChapterSelector/OptionsChapterSelectorContainer/OptionsChapterSelectorContainer.component";
import {
  OptionsChapterSelectorMobileComponent
} from "../OptionsChapterSelector/OptionsChapterSelectorMobile/OptionsChapterSelectorMobile.component";

const optionsChapters: ActiveChapterModel[] = [
  {
    buttonText: "Solidity Finder Options",
    pageKey: "SolidityFinderOptionsChapter",
  },
  {
    buttonText: "Solidity Card Options",
    pageKey: "SolidityTicketCardOptionsChapter",
  },
  {
    buttonText: "Chart Options",
    pageKey: "ChartOptionsChapter",
  },
]

@Component({
  selector: "app-options-page",
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe,
    SolidityFinderSettingsChapterComponent,
    NgOptimizedImage,
    SolidityTicketCardSettingsChapterContainerComponent,
    ChapterSelectorItemComponent,
    OptionsChapterContainerComponent,
    OptionsChapterSelectorContainerComponent,
    OptionsChapterSelectorMobileComponent
  ],
  templateUrl: 'OptionsPageContainer.component.html'
})

export class OptionsPageContainerComponent {
  activePages$: Observable<ActivePagesModel>;
  activeOptionChapter: ActiveOptionsChapter | null;
  closeWindowClickHandler: () => void;
  isMobileChapterSelectorActive: boolean;
  constructor(
    store: Store<StoreModel>
  ) {
    this.isMobileChapterSelectorActive = true;
    this.activeOptionChapter = null;
    this.activePages$ = store.select('activePages')
    this.closeWindowClickHandler = () => {
      store.dispatch(switchOptionsPageAction({pageState: false}))
    }
    this.activePages$.subscribe(() => {
      this.isMobileChapterSelectorActive = true;
      this.activeOptionChapter = "SolidityFinderOptionsChapter"
    })
  }

  switchActiveOptionsChapterHandler = (pageName: ActiveOptionsChapter) => {
    this.isMobileChapterSelectorActive = false;
    this.activeOptionChapter = pageName;
  }

  switchActiveOptionsChapterSelectorMobileHandler = () => {
    this.isMobileChapterSelectorActive = true;
  }

  protected readonly optionsChapters = optionsChapters;
}
