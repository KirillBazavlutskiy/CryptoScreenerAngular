import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SymbolsListContainerComponent} from "./components/SymbolsList/SymbolsListContainer/symbolsListContainer.component";
import {
  SymbolsTableContainerComponent
} from "./components/SymbolsTable/SymbolsTableContainer/SymbolsTableContainer.component";
import {Store} from "@ngrx/store";
import {ChangeSymbolPriceAction, FetchSymbolsListAction} from "./store/SymbolsList/SymbolsList.actions";
import {Observable} from "rxjs";
import {StoreModel} from "./store/Store.model";
import {AsyncPipe, NgClass} from "@angular/common";
import {HeaderComponent} from "./components/Header/Header.component";
import {
  SymbolsChartsPageContainerComponent
} from "./components/SymbolsChartPage/SymbolsChartsPageContainer/SymbolsChartsPageContainer.component";
import {WebSocketService} from "./services/WebSocket/WebSocket.service";
import {TickerData} from "./models/Websocket/BinanceStreamDayTicker";

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
  providers: [
    WebSocketService,
    { provide: 'WS_URL', useValue: 'wss://fstream.binance.com/ws/' }
  ]
})

export class AppComponent implements OnInit {
  title = "Hello world!";
  SymbolsListActivePage$: Observable<boolean>;
  constructor(
    private store: Store<StoreModel>,
    private websocket: WebSocketService<TickerData[]>
  ) {
    this.SymbolsListActivePage$ = store.select('symbolsListPageActive');
  }

  ngOnInit() {
    this.store.dispatch(FetchSymbolsListAction());
    this.websocket.setNewUrl("!ticker@arr");
    this.websocket.receiveMessage().subscribe((message) => {
      message.forEach(updateTicker => {
        this.store.dispatch(ChangeSymbolPriceAction({
          symbol: updateTicker.s,
          price: Number(updateTicker.c)
        }))
      })
    })
  }
}
