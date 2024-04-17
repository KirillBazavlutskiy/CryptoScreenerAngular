import {Component} from "@angular/core";
import {SymbolsListItemComponent} from "../SymbolsListItem/symbolsListItem.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {SolidityModel} from "../../../models/SolidityFinderModels.model";
import {Observable} from "rxjs";
import {Store} from '@ngrx/store';
import {StoreModel} from "../../../store/Store.model";

@Component({
  selector: 'app-symbols-item-list',
  standalone: true,
  imports: [
    SymbolsListItemComponent,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: 'symbolsListContainer.component.html'
})

export class SymbolsListContainerComponent {

  symbolsList$: Observable<SolidityModel[]>;

  constructor(private store: Store<StoreModel>) {
    this.symbolsList$ = store.select('symbolsList')
  }
}
