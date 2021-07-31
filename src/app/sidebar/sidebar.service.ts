import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Injectable, OnDestroy } from "@angular/core";

import { AssetsService } from "../core/services/assets.service";
import { CacheService } from "../core/services/cache.service";
import { NativeService } from "../native/native.service";
import { NativeType } from "../native/native-type";
import { shareReplay, switchMap } from "rxjs/operators";

export type SidebarItems = string[] | null;

@Injectable({
    providedIn: "root"
})
export class SidebarService implements OnDestroy {
    public readonly items$: Observable<SidebarItems>;
    private readonly itemsSubject: BehaviorSubject<SidebarItems> =
        new BehaviorSubject<SidebarItems>(null);

    private itemsSubscription?: Subscription | null;

    constructor(
        private readonly cacheService: CacheService,
        private readonly assetsService: AssetsService,
        private readonly nativeService: NativeService
    ) {
        this.items$ = this.itemsSubject.asObservable();
        this.itemsSubscription = this.nativeService.currentType$
            .pipe(switchMap(type => this.onTypeChanged(type)))
            .subscribe(response => this.onItemsLoaded(response));
    }

    public ngOnDestroy(): void {
        if (this.itemsSubscription) {
            this.itemsSubscription.unsubscribe();
            this.itemsSubscription = null;
        }

        this.itemsSubject.complete();
    }

    private onTypeChanged(type: NativeType): Observable<SidebarItems> {
        this.itemsSubject.next(null);

        let typeStr = "";
        switch (type) {
            case NativeType.Bitfield: {
                typeStr = "bitfields";
                break;
            }
            case NativeType.Enum: {
                typeStr = "enums";
                break;
            }
            default: {
                typeStr = "classes";
                break;
            }
        }

        const cacheKey = `sidebar:${typeStr}`;
        const cached =
            this.cacheService.get<Observable<SidebarItems>>(cacheKey);

        if (cached !== null) {
            return cached;
        }

        const REPLAY_BUFFER_SIZE = 1;

        const file = `${typeStr}.json`;
        const obs = this.assetsService
            .get<SidebarItems>(`natives/${file}`)
            .pipe(shareReplay(REPLAY_BUFFER_SIZE));

        this.cacheService.set(cacheKey, obs);
        return obs;
    }

    private onItemsLoaded(items: SidebarItems): void {
        if (!items) {
            console.error("Could not retrive items for the selected type");
            return;
        }

        this.itemsSubject.next(items);
    }
}
