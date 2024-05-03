import {Component} from "@angular/core";
import {SolidityModel} from "../../../models/RestApi/SolidityFinderApi/GetSolidity.model";
import {SymbolsTableItemComponent} from "../SymbolsTableItem/SymbolsTableItem.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {SymbolsListItemComponent} from "../../SymbolsList/SymbolsListItem/symbolsListItem.component";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {StoreModel} from "../../../store/Store.model";

@Component({
  selector: 'app-symbols-table-container',
  standalone: true,
  imports: [
    SymbolsTableItemComponent,
    NgForOf,
    SymbolsListItemComponent,
    AsyncPipe
  ],
  templateUrl: 'SymbolsTableContainer.component.html'
})

export class SymbolsTableContainerComponent {
  symbolsList$: Observable<SolidityModel[]>;

  constructor(private store: Store<StoreModel>) {
    this.symbolsList$ = store.select('symbolsList');
  }
}
