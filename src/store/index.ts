import { configureStore } from "@reduxjs/toolkit";
import common from "./slices/common";
import componentMenu from "./slices/componentMenu";
import workbanchList from "./slices/workbanchList";
export const store = configureStore({
  reducer: {
    common,
    componentMenu,
    workbanchList
  },
});
