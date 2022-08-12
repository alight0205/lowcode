import { configureStore } from "@reduxjs/toolkit";
import common from "./slices/common";
import componentMenu from "./slices/componentMenu";
import workbenchList from "./slices/workbenchList";
export const store = configureStore({
  reducer: {
    common,
    componentMenu,
    workbenchList
  },
});
