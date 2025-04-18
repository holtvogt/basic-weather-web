import { Routes } from "@angular/router";
import { MainComponent } from "./components/main/main.component";
import { NextWeekComponent } from "./components/next-week/next-week.component";
import { ThisWeekComponent } from "./components/this-week/this-week.component";
import { TodayComponent } from "./components/today/today.component";

/**
 * Application routes.
 */
export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full", title: "Home" },
    { path: "home", component: MainComponent, title: "Home" },
    { path: "today", component: TodayComponent, title: "Today's Weather" },
    { path: "thisWeek", component: ThisWeekComponent, title: "This Week's Weather" },
    { path: "nextWeek", component: NextWeekComponent, title: "Next Week's Weather" },
];
