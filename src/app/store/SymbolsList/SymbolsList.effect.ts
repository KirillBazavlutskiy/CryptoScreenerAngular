import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {FetchSymbolsListAction, FetchSymbolsListSuccessAction} from "./SymbolsList.actions";
import {catchError, EMPTY, map, mergeMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SolidityModel} from "../../models/RestApi/SolidityFinderApi/GetSolidity.model";

@Injectable()
export class SymbolsListLoadEffect {
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  FetchSymbolsListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchSymbolsListAction),
      mergeMap(({ solidityFinderOptions }) =>
        this.http.get<SolidityModel[]>("https://cryptoscreenernodejsapi.onrender.com/api/GetSolidityList").pipe(
          map(data => {
            const sortedData = data
              .sort((a, b) => {
                const volumeForA = a.QuoteVolume * a.Price;
                const volumeForB = b.QuoteVolume * b.Price;
                if (volumeForA < volumeForB) return 1;
                if (volumeForA > volumeForB) return -1;
                return 0;
              })

            if (solidityFinderOptions) {
              const filteredData = sortedData.filter(solidityModel => {
                const minVolumeAccess = solidityFinderOptions.MinVolume * 100000 <= solidityModel.QuoteVolume;
                const ratioAccess = solidityFinderOptions.RatioAccess <= solidityModel.Solidity.Ratio;
                const upToPriceAccess = solidityFinderOptions.UpToPriceAccess >= solidityModel.Solidity.UpToPrice;
                const nonConcernPeriodAccess = solidityFinderOptions.NonConcernPeriodAccess <= solidityModel.Solidity.NonConcernPeriod;

                return minVolumeAccess && ratioAccess && upToPriceAccess && nonConcernPeriodAccess;
              })
              return FetchSymbolsListSuccessAction({ symbolsList: filteredData })
            } else {
              return FetchSymbolsListSuccessAction({ symbolsList: sortedData })
            }
          }),
          catchError(() => EMPTY)
        )
      )
    )
  )
}
