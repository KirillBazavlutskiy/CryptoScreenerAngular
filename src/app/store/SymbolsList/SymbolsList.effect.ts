import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {FetchSymbolsListAction, FetchSymbolsListSuccessAction} from "./SymbolsList.actions";
import {catchError, EMPTY, map, mergeMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SolidityModel} from "../../models/SolidityFinderModels.model";

@Injectable()
export class SymbolsListLoadEffect {
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  FetchSymbolsListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchSymbolsListAction),
      mergeMap(() =>
        this.http.get<SolidityModel[]>("https://cryptoscreenernodejsapi.onrender.com/api/GetSolidityList").pipe(
          map(data => FetchSymbolsListSuccessAction({ symbolsList: data })),
          catchError(() => EMPTY)
        )
      )
    )
  )
}
