import { Subscription } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";

import { NativeItem } from "../native/native-item";
import { NativeService } from "../native/native.service";
import { NativeType } from "../native/native-type";

@Component({
    selector: "app-menu-bar",
    templateUrl: "./menu-bar.component.html",
    styleUrls: ["./menu-bar.component.scss"]
})
export class MenuBarComponent implements OnInit, OnDestroy {
    public types: NativeItem[] = [];

    public currentType?: NativeType;
    private currentTypeSubscription?: Subscription | null;

    constructor(private readonly nativeService: NativeService) {}

    public ngOnInit(): void {
        this.types = this.nativeService.types;
        this.currentTypeSubscription =
            this.nativeService.currentType$.subscribe(type => {
                this.currentType = type;
            });
    }

    public ngOnDestroy(): void {
        if (this.currentTypeSubscription) {
            this.currentTypeSubscription.unsubscribe();
            this.currentTypeSubscription = null;
        }
    }

    public onChange(type: NativeType): void {
        this.nativeService.currentType = type;
    }
}
