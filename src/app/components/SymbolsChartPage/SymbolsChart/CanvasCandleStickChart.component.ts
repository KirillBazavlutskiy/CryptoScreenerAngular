import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import { Chart, TimeScale, TimeSeriesScale, LinearScale } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';
import Annotation from 'chartjs-plugin-annotation';
import {CandlestickBinanceData} from "../../../models/CandlestickData.model";

Chart.register(
  LinearScale,
  CandlestickController, CandlestickElement,
  TimeScale, TimeSeriesScale,
  zoomPlugin, Annotation
);

@Component({
  selector: 'app-canvas-candlestick-chart',
  template: '<canvas [id]="canvasId"></canvas>',
  standalone: true,
})

export class CanvasCandleStickChartComponent implements AfterViewInit, OnChanges {
  @Input() canvasId!: string;
  @Input() CandlestickData!: CandlestickBinanceData[];
  @Input() SolidityPrice!: string | null;
  CandlestickDataCanvas: any[] = [];

  candlestickChart: any;

  ngOnChanges(changes: SimpleChanges) {
    if (this.CandlestickData.length !== 0) {
      this.updateChartData();
    }
  }

  ngAfterViewInit() {
    if (this.canvasId) {
      try {
        this.createCandlestickChart();
      } catch (e) {
        console.log("error in init")
      }
    }
  }

  private createCandlestickChart() {
    this.candlestickChart = new Chart(this.canvasId, {
      type: 'candlestick',
      data: {
        datasets: [{
          label: 'CHRT - Chart.js Corporation',
          data: this.CandlestickDataCanvas,
          borderColor: 'rgba(255, 0, 0, 1)',
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          x: {
            type: "timeseries",
            time: {
              unit: 'minute'
            }
          },
          y: {
            position: "right"
          }
        },
        plugins: {
          annotation: {
            annotations: [{
              type: 'line',
              scaleID: 'y',
              value: Number(this.SolidityPrice),
              borderColor: 'red',
              borderWidth: 2
            }]
          },
          zoom: {
            pan: {
              enabled: true,
              mode: 'x',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              drag: {
                enabled: false
              },
              pinch: {
                enabled: false
              },
              mode: 'x',
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }

  private updateChartData() {
    this.CandlestickDataCanvas = this.CandlestickData.map((candle) => {
      return {
        x: parseFloat(candle.openTime.toString()),
        o: parseFloat(candle.open),
        h: parseFloat(candle.high),
        l: parseFloat(candle.low),
        c: parseFloat(candle.close)
      }
    });

    if (this.candlestickChart) {
      this.candlestickChart.data.datasets[0].data = this.CandlestickDataCanvas;

      const annotation = {
        type: 'line',
        scaleID: 'y',
        value: Number(this.SolidityPrice),
        borderColor: 'red',
        borderWidth: 2
      };

      if (!this.candlestickChart.options.plugins.annotation) {
        this.candlestickChart.options.plugins.annotation = {
          annotations: [annotation]
        };
      } else {
        this.candlestickChart.options.plugins.annotation.annotations = [annotation];
      }

      this.candlestickChart.update();
    }
  }
}
