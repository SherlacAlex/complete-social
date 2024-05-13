import { NavigateOptions, To } from "react-router-dom";

export interface NavigationItem {
    to: To,
    options?: NavigateOptions
}