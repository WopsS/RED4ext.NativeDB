import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MenuBarComponent } from "./menu-bar.component";
import { MenuButtonComponent } from "./menu-button/menu-button.component";
import { MenuContainerComponent } from "./menu-container/menu-container.component";

describe("MenuBarComponent", () => {
    let component: MenuBarComponent;
    let fixture: ComponentFixture<MenuBarComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                MenuButtonComponent,
                MenuContainerComponent,
                MenuBarComponent
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuBarComponent);
        nativeElement = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have 3 types", () => {
        const buttons = nativeElement.querySelectorAll("button");

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(buttons).toHaveSize(3);
    });
});
