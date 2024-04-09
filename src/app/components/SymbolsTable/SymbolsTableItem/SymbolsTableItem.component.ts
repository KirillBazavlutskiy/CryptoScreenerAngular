import {Component, Input} from "@angular/core";
import {SolidityModel} from "../../../models/SolidityFinderModels.model";
import {
  BinanceOrdersCalculatingKit
} from "../../../services/BinanceServices/BinanceOrdersCalculationKit/BinanceOrdersCalculationKit.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-symbols-table-item',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: 'SymbolsTableItem.component.html'
})

export class SymbolsTableItemComponent {
  @Input() solidityInfo!: SolidityModel;
  protected readonly BinanceOrdersCalculatingKit = BinanceOrdersCalculatingKit;
}
