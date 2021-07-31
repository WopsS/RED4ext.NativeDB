import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class MenuService {
    public readonly isOpen$: Observable<boolean>;
    private readonly isOpen: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);

    constructor() {
        this.isOpen$ = this.isOpen.asObservable();
    }

    public toggle(): void {
        this.isOpen.next(!this.isOpen.value);
    }
}
