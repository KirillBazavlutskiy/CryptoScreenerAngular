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

type ActiveOptionsChapter =
  "SolidityFinderChapter" |
  "ChartOptionsChapter"

@Component({
  selector: "app-options-page",
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe,
    SolidityFinderSettingsChapterComponent,
    NgOptimizedImage
  ],
  templateUrl: 'OptionsPageContainer.component.html'
})

export class OptionsPageContainerComponent {
  activePages$: Observable<ActivePagesModel>;
  activeOptionChapter: ActiveOptionsChapter | null;
  closeWindowClickHandler: () => void;
  constructor(
    store: Store<StoreModel>
  ) {
    this.activeOptionChapter = null;
    this.activePages$ = store.select('activePages')
    this.closeWindowClickHandler = () => {
      store.dispatch(switchOptionsPageAction({pageState: false}))
    }
    this.activePages$.subscribe(() => this.activeOptionChapter = "SolidityFinderChapter")
  }

  switchActiveOptionsChapterHandler = (pageName: ActiveOptionsChapter) => {
    this.activeOptionChapter = pageName;
  }
  protected readonly switchOptionsPageAction = switchOptionsPageAction;
}
