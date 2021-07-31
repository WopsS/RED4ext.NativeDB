import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { TestBed } from "@angular/core/testing";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { MenuBarComponent } from "./menu-bar/menu-bar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

describe("AppComponent", () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterTestingModule],
            declarations: [
                AppComponent,
                HeaderComponent,
                MenuBarComponent,
                SidebarComponent
            ]
        }).compileComponents();
    });

    it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
