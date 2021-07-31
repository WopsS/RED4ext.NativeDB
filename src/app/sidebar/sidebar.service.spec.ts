import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";

import { SidebarService } from "./sidebar.service";

describe("SidebarService", () => {
    let service: SidebarService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule]
        });
        service = TestBed.inject(SidebarService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
