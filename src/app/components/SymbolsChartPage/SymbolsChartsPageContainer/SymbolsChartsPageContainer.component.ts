import {Component} from "@angular/core";
import {SymbolsListContainerComponent} from "../../SymbolsList/SymbolsListContainer/symbolsListContainer.component";
import {SymbolsChartsContainerComponent} from "../SymbolsChartsContainer/SymbolsChartsContainer.component";

@Component({
  selector: 'app-symbols-charts-page-container',
  templateUrl: 'SymbolsChartsPageContainer.component.html',
  imports: [
    SymbolsListContainerComponent,
    SymbolsChartsContainerComponent
  ],
  standalone: true
})

export class SymbolsChartsPageContainerComponent {
}
