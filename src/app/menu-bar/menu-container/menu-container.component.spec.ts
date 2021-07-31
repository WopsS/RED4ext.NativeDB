import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MenuContainerComponent } from "./menu-container.component";

describe("NativeSelectorComponent", () => {
    let component: MenuContainerComponent;
    let fixture: ComponentFixture<MenuContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MenuContainerComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
