import { Subscription } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";

import { MenuService } from "./core/services/menu.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
    public isMenuOpen = false;
    private isMenuOpenSub?: Subscription | null;

    constructor(private readonly menuService: MenuService) {}

    public ngOnInit(): void {
        this.isMenuOpenSub = this.menuService.isOpen$.subscribe(state => {
            this.isMenuOpen = state;
        });
    }

    public ngOnDestroy(): void {
        if (this.isMenuOpenSub) {
            this.isMenuOpenSub.unsubscribe();
            this.isMenuOpenSub = null;
        }
    }
}
