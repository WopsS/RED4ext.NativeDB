import { Component, Input } from "@angular/core";

@Component({
    selector: "app-menu-container",
    templateUrl: "./menu-container.component.html",
    styleUrls: ["./menu-container.component.scss"]
})
export class MenuContainerComponent {
    @Input() public name?: string;
}
