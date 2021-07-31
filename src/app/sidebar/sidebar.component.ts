import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";

import { SidebarItems, SidebarService } from "./sidebar.service";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
    public items$!: Observable<SidebarItems>;

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    public ghostItems = new Array(30);

    constructor(private readonly sidebarService: SidebarService) {}

    public ngOnInit(): void {
        this.items$ = this.sidebarService.items$;
    }

    public trackItem(_index: number, item: string): string {
        return item;
    }
}
