import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {StoreModel} from "../../store/Store.model";
import {switchActiveMainPageAction, switchOptionsPageAction} from "../../store/ActivePage/ActivePages.actions";
import {Observable} from "rxjs";
import {ActivePagesModel} from "../../store/ActivePage/ActivePages.model";
import {AsyncPipe, NgClass} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe
  ],
  templateUrl: 'Header.component.html'
})

export class HeaderComponent {
  ButtonClickMainPageSwitchHandler: () => void;
  ButtonClickOptionsPageSwitchHandler: () => void;
  activePages: Observable<ActivePagesModel>
  constructor(
    private store: Store<StoreModel>
  ) {
    this.ButtonClickMainPageSwitchHandler = () => {
      this.store.dispatch(switchActiveMainPageAction({ pageState: false }))
    }
    this.ButtonClickOptionsPageSwitchHandler = () => {
      this.store.dispatch(switchOptionsPageAction({}))
    }
    this.activePages = store.select('activePages');
  }
}
