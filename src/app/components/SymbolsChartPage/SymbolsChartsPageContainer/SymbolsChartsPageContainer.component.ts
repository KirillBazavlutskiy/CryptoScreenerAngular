import {Component} from "@angular/core";
import {SymbolsListContainerComponent} from "../../SymbolsList/SymbolsListContainer/symbolsListContainer.component";
import {SymbolsChartsComponent} from "../SymbolsChartsContainer/symbols-charts.component";

@Component({
  selector: 'app-symbols-charts-page-container',
  templateUrl: 'SymbolsChartsPageContainer.component.html',
  imports: [
    SymbolsListContainerComponent,
    SymbolsChartsComponent
  ],
  standalone: true
})

export class SymbolsChartsPageContainerComponent {
}
