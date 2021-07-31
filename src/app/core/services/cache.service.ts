import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class CacheService {
    private readonly cache: Map<string, unknown> = new Map();

    public get<T>(key: string): T | null {
        if (this.cache.has(key)) {
            return this.cache.get(key) as T;
        }

        return null;
    }

    public set<T>(key: string, value: T): void {
        this.cache.set(key, value);
    }

    public delete(key: string): void {
        this.cache.delete(key);
    }

    public has(key: string): boolean {
        return this.cache.has(key);
    }
}
