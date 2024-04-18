import {Component} from "@angular/core";
import {SymbolsChartComponent} from "../SymbolsChart/SymbolsChart.component";

@Component({
  selector: 'app-symbols-charts',
  templateUrl: 'symbols-charts.component.html',
  imports: [
    SymbolsChartComponent
  ],
  standalone: true
})

export class SymbolsChartsComponent {
  CanvasChartId1: string = "";
  CanvasChartId2: string = "";
  CanvasChartId3: string = "";

  constructor() {
    this.CanvasChartId1 = "canvas1";
    this.CanvasChartId2 = "canvas2";
    this.CanvasChartId3 = "canvas3";
  }
}
