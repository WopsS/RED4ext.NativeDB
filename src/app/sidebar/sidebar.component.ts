import { ActivatedRoute } from "@angular/router";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Observable } from "rxjs";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { delay, filter, take } from "rxjs/operators";

import { SidebarItems, SidebarService } from "./sidebar.service";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit, AfterViewInit {
    public items$!: Observable<SidebarItems>;

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    public ghostItems = new Array(30);

    @ViewChild(CdkVirtualScrollViewport)
    private readonly virtualScroll!: CdkVirtualScrollViewport;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly sidebarService: SidebarService
    ) {}

    public ngOnInit(): void {
        this.items$ = this.sidebarService.items$;
    }

    public ngAfterViewInit(): void {
        this.sidebarService.items$
            .pipe(
                filter(items => items !== null),
                take(1),
                delay(1000) // TODO: Try to remove this.
            )
            .subscribe(items => {
                if (!items) {
                    return;
                }

                let currentRoute = this.route.firstChild;
                while (currentRoute?.firstChild) {
                    currentRoute = currentRoute.firstChild;
                }

                if (currentRoute) {
                    const native = currentRoute.snapshot.params.native as
                        | string
                        | null
                        | undefined;

                    if (native) {
                        const index = items.indexOf(native);
                        if (index !== -1) {
                            this.virtualScroll.scrollToIndex(index);
                            // TODO: Handle other native types.
                        }
                    }
                }
            });
    }

    public trackItem(_index: number, item: string): string {
        return item;
    }
}
