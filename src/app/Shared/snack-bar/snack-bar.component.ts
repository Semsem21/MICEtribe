import { Component, Input } from "@angular/core";

@Component({
	selector: "snackbar",
	templateUrl: "./snack-bar.component.html",
	styleUrls: ["./snack-bar.component.scss"],
})
export class SnackBarComponent {
	@Input() undoMessage: string | null = null;
	@Input() confirmationMsg: string | null = null;
}
