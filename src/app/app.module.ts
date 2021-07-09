import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, NotFoundComponent, HomeComponent],
    imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
    providers: []
})
export class AppModule {}
