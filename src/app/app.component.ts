import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SymbolsListContainerComponent} from "./components/SymbolsList/SymbolsListContainer/symbolsListContainer.component";
import {
  SymbolsTableContainerComponent
} from "./components/SymbolsTable/SymbolsTableContainer/SymbolsTableContainer.component";
import {Store} from "@ngrx/store";
import {FetchSymbolsListAction} from "./store/SymbolsList/SymbolsList.actions";
import {Observable} from "rxjs";
import {StoreModel} from "./store/Store.model";
import {AsyncPipe, NgClass} from "@angular/common";
import {HeaderComponent} from "./components/Header/Header.component";
import {
  SymbolsChartsPageContainerComponent
} from "./components/SymbolsChartPage/SymbolsChartsPageContainer/SymbolsChartsPageContainer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  imports: [
    RouterOutlet,
    SymbolsListContainerComponent,
    SymbolsTableContainerComponent,
    NgClass,
    HeaderComponent,
    AsyncPipe,
    SymbolsChartsPageContainerComponent,
  ],
})

export class AppComponent implements OnInit {
  title = "Hello world!";
  SymbolsListActivePage$: Observable<boolean>;
  constructor(
    private store: Store<StoreModel>,
  ) {
    this.SymbolsListActivePage$ = store.select('symbolsListPageActive');
  }

  ngOnInit() {
    this.store.dispatch(FetchSymbolsListAction());
  }
}
