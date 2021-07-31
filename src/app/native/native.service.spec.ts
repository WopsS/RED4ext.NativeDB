import { TestBed } from "@angular/core/testing";

import { NativeService } from "./native.service";

describe("NativesService", () => {
    let service: NativeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NativeService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
