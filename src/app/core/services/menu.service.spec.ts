import { TestBed } from "@angular/core/testing";

import { MenuService } from "./menu.service";

describe("MenuService", () => {
    let service: MenuService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MenuService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should toggle menu state", () => {
        let initalState: boolean | undefined;
        let currentState: boolean | undefined;

        service.isOpen$.subscribe(state => {
            if (typeof initalState === "undefined") {
                initalState = state;
            } else {
                currentState = state;
            }
        });

        service.toggle();
        expect(currentState === !initalState).toBeTrue();
    });
});
