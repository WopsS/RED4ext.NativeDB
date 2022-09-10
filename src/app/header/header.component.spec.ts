import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RouterTestingModule } from "@angular/router/testing";
import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick
} from "@angular/core/testing";

import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, FontAwesomeModule],
            declarations: [HeaderComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        nativeElement = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should have 'NativeDB' home link", () => {
        const a = nativeElement.querySelector("a");

        expect(a).toBeTruthy();
        expect(a?.textContent).toContain("NativeDB");
        expect(a?.getAttribute("href")).toEqual("/");
    });

    it("should change button states", fakeAsync(() => {
        const button = nativeElement.querySelector("button");

        expect(button).toBeTruthy();
        expect(component.isMenuOpen).toBeFalse();

        const icon = button?.querySelector("fa-icon");
        expect(icon).toBeTruthy();

        let svg = icon?.querySelector("svg");
        expect(svg?.classList).toContain("fa-bars");

        button?.click();
        fixture.detectChanges();
        tick();

        expect(component.isMenuOpen).toBeTrue();

        svg = icon?.querySelector("svg");
        expect(svg?.classList).toContain("fa-xmark");

        button?.click();
        fixture.detectChanges();
        tick();

        expect(component.isMenuOpen).toBeFalse();

        svg = icon?.querySelector("svg");
        expect(svg?.classList).toContain("fa-bars");
    }));
});
