import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

@NgModule({
    bootstrap: [AppComponent],
    imports: [BrowserModule, AppRoutingModule],
    declarations: [AppComponent, PageNotFoundComponent],
    providers: []
})
export class AppModule {}
