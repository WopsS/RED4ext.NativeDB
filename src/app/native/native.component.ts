import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";

import { NativeService } from "./native.service";

@Component({
    selector: "app-native",
    templateUrl: "./native.component.html",
    styleUrls: ["./native.component.scss"]
})
export class NativeComponent implements OnInit, OnDestroy {
    private readonly subscriptions: Subscription = new Subscription();

    constructor(
        private readonly route: ActivatedRoute,
        private readonly nativeService: NativeService
    ) {}

    public ngOnInit(): void {
        this.subscriptions.add(
            this.route.params.subscribe(params => {
                const native: string | null | undefined = params.native as
                    | string
                    | null
                    | undefined;

                if (native) {
                    this.onNativeChanged(native);
                }
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private onNativeChanged(native: string): void {
        this.nativeService.currentNative = native;
    }
}
