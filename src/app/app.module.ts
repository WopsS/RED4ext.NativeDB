import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { MenuBarComponent } from "./menu-bar/menu-bar.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

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
