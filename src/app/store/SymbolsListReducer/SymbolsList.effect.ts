import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  SolidityFinderService
} from "../../services/BinanceServices/SolidityFinderService/SolidityFinderService.service";
import {FetchSymbolsListAction, FetchSymbolsListSuccessAction} from "./SymbolsList.actions";
import {catchError, EMPTY, from, map, mergeMap} from "rxjs";

@Injectable()
export class SymbolsListLoadEffect {
  constructor(
    private actions$: Actions,
    private SFS: SolidityFinderService
  ) {}

  FetchSymbolsListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchSymbolsListAction),
      mergeMap(() =>
        from(this.SFS.FindAllSolidity(1000000, 0, 0, 0)).pipe(
          map(data => FetchSymbolsListSuccessAction({ symbolsList: data })),
          catchError(() => EMPTY)
        )
      )
    )
  )
}
