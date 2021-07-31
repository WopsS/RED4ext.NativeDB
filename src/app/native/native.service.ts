import { distinctUntilChanged } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable, OnDestroy } from "@angular/core";

import { NativeItem } from "./native-item";
import { NativeType } from "./native-type";

@Injectable({
    providedIn: "root"
})
export class NativeService implements OnDestroy {
    public readonly types: NativeItem[] = [
        {
            id: NativeType.Class,
            name: "Class"
        },
        {
            id: NativeType.Enum,
            name: "Enum"
        },
        {
            id: NativeType.Bitfield,
            name: "Bitfield"
        }
    ];

    public readonly currentType$: Observable<NativeType>;
    private readonly currentTypeSubject: BehaviorSubject<NativeType> =
        new BehaviorSubject<NativeType>(NativeType.Class);

    constructor() {
        this.currentType$ = this.currentTypeSubject
            .asObservable()
            .pipe(distinctUntilChanged());
    }

    public ngOnDestroy(): void {
        this.currentTypeSubject.complete();
    }

    public set currentType(type: NativeType) {
        this.currentTypeSubject.next(type);
    }
}
