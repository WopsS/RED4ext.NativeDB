import { Subscription } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import { MenuService } from "../services/menu.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
    public readonly faBars = faBars;
    public readonly faTimes = faTimes;

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

    public toggleMenu(): void {
        this.menuService.toggle();
    }
}
