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
  closeWindowClickHandler: () => void;
  constructor(
    store: Store<StoreModel>
  ) {
    this.activePages$ = store.select('activePages')
    this.closeWindowClickHandler = () => {
      store.dispatch(switchOptionsPageAction({pageState: false}))
    }
  }
}
