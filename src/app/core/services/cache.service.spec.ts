import { TestBed } from "@angular/core/testing";

import { CacheService } from "./cache.service";

describe("CacheService", () => {
    const key = "test:cache";
    const value = 123;

    let service: CacheService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CacheService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should set an entry", () => {
        service.set(key, value);
        expect(service.has(key)).toBeTrue();
    });

    it("should delete an entry", () => {
        service.set(key, value);
        expect(service.has(key)).toBeTrue();

        service.delete(key);
        expect(service.has(key)).toBeFalse();
    });

    it("should return the correct value for key", () => {
        service.set(key, value);
        expect(service.has(key)).toBeTrue();

        const cachedValue = service.get(key);
        expect(cachedValue).toEqual(value);
    });
});
