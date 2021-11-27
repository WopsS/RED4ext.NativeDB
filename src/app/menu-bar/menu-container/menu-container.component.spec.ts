import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick
} from "@angular/core/testing";

import { MenuContainerComponent } from "./menu-container.component";

describe("NativeSelectorComponent", () => {
    let component: MenuContainerComponent;
    let fixture: ComponentFixture<MenuContainerComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MenuContainerComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuContainerComponent);
        nativeElement = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should should not have 'span' if the name not is supplied", fakeAsync(() => {
        const span = nativeElement.querySelector("span");
        expect(span).toBeFalsy();
    }));

    it("should should have 'span' if the name is supplied", fakeAsync(() => {
        component.name = "SomeName";

        fixture.detectChanges();
        tick();

        const span = nativeElement.querySelector("span");
        expect(span).toBeTruthy();
        expect(span?.textContent?.trim()).toEqual("SomeName:");
    }));
});
