import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { MenuBarComponent } from "./components/menu-bar/menu-bar.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@NgModule({
    bootstrap: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
    declarations: [
        AppComponent,
        NotFoundComponent,
        HeaderComponent,
        SidebarComponent,
        MenuBarComponent,

        HomeComponent
    ],
    providers: []
})
export class AppModule {}
