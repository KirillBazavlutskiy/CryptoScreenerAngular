import {Component, Input} from "@angular/core";
import {SolidityModel} from "../../../models/SolidityFinderModels.model";
import {
  BinanceOrdersCalculatingKit
} from "../../../services/BinanceServices/BinanceOrdersCalculationKit/BinanceOrdersCalculationKit.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-symbol-item',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: 'symbolsListItem.component.html'
})

export class SymbolsListItemComponent {
  @Input() symbolTicket!: SolidityModel;
  protected readonly BinanceOrdersCalculatingKit = BinanceOrdersCalculatingKit;
}
