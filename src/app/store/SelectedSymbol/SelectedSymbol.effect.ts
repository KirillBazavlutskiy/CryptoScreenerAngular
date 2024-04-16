import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {selectedSymbolAction} from "./SelectedSymbol.actions";
import {map} from "rxjs";
import {switchActivePageAction} from "../ActivePage/ActivePage.actions";

@Injectable()
export class SelectedSymbolEffect {
  constructor(
    private actions$: Actions
  ) {}

  SelectSymbolEffect$ = createEffect(() =>
  this.actions$.pipe(
    ofType(selectedSymbolAction),
    map(() => switchActivePageAction({ pageState: true }))
  ))
}
