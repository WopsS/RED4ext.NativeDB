import { Component, HostBinding, Input } from "@angular/core";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "button[menu-button]",
    templateUrl: "./menu-button.component.html",
    styleUrls: ["./menu-button.component.scss"]
})
export class MenuButtonComponent {
    @Input()
    public active = false;

    @HostBinding("class.active")
    public get isActive(): boolean {
        return this.active;
    }
}
