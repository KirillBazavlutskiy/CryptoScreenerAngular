import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {StoreModel} from "../../store/Store.model";
import {switchActivePageAction} from "../../store/ActivePageReducer/ActivePage.actions";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: 'Header.component.html'
})

export class HeaderComponent {
  ButtonClickHandler: () => void;
  constructor(
    private store: Store<StoreModel>
  ) {
    this.ButtonClickHandler = () => {
      this.store.dispatch(switchActivePageAction())
    }
  }

  protected readonly SwitchActivePageAction = switchActivePageAction;
}
