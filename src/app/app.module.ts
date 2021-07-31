import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { ScrollingModule } from "@angular/cdk/scrolling";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { MenuBarComponent } from "./menu-bar/menu-bar.component";
import { MenuButtonComponent } from "./menu-bar/menu-button/menu-button.component";
import { MenuContainerComponent } from "./menu-bar/menu-container/menu-container.component";
import { NativeComponent } from "./native/native.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,

        FontAwesomeModule,
        NgxSkeletonLoaderModule,
        ScrollingModule
    ],
    declarations: [
        AppComponent,
        NotFoundComponent,
        HeaderComponent,
        SidebarComponent,
        MenuBarComponent,
        MenuContainerComponent,
        MenuButtonComponent,

        HomeComponent,
        NativeComponent
    ],
    providers: []
})
export class AppModule {}
