import {createAction, props} from "@ngrx/store";
import {StylingOptionsModel} from "../../models/Options/StylingOptions.model";

export const setStylingOptions = createAction(
  '[ Styling Options ] Set Styling Options',
  props<{ stylingOptions: StylingOptionsModel }>()
)
