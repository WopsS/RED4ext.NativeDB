import { RouterTestingModule } from "@angular/router/testing";
import { TestBed } from "@angular/core/testing";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { MenuBarComponent } from "./components/menu-bar/menu-bar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

describe("AppComponent", () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
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
