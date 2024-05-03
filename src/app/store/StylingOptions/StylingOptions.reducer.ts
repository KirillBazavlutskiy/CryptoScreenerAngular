import {createReducer, on} from "@ngrx/store";
import {StylingOptionsModel} from "../../models/Options/StylingOptions.model";
import {setStylingOptions} from "./StylingOptions.action";
import {DefaultStyingOptions} from "./StylingOptions.default";

export const stylingOptionsReducer = createReducer<StylingOptionsModel>(
  DefaultStyingOptions,
  on(setStylingOptions, (state, { stylingOptions }) => stylingOptions)
)
