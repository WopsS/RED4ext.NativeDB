import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

@NgModule({
    bootstrap: [AppComponent],
    imports: [BrowserModule, AppRoutingModule],
    declarations: [AppComponent, NotFoundComponent, HomeComponent],
    providers: []
})
export class AppModule {}
