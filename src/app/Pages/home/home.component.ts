import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { debounceTime } from "rxjs";
import { countryInput, genderInputs, nameInput, nationalityInputs } from "src/app/Models/formData";
import { formValueChange, redo, undo } from "src/app/Store/form/form.actions";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
	reactiveForm!: FormGroup;
	private store = inject(Store);
	nameInput = nameInput;
	genderInputs = genderInputs;
	nationalityInputs = nationalityInputs;
	countryInput = countryInput;
	undoMsg: string | null = null;
	confMsg: string | null = null;
	canUndo = false;
	canRedo = false;
	timeSnackBar: any;

	ngOnInit(): void {
		this.reactiveForm = new FormGroup({
			fname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
			lname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
			email: new FormControl(null, [Validators.required, Validators.email]),
			gender: new FormControl(null),
			country: new FormControl(null),
			nationality: new FormControl(null),
		});

		this.reactiveForm.valueChanges.pipe(debounceTime(300)).subscribe((values) => {
			this.store.dispatch(formValueChange({ currentState: values }));
		});

		this.store.select("reactiveForm").subscribe((state) => {
			this.reactiveForm.patchValue(state.present, { emitEvent: false });
			this.canUndo = state.past.length > 1;
			this.canRedo = state.future.length > 0;

			if (state.past.length == 0) {
				this.reactiveForm.patchValue([{}]);
			}
		});
	}

	ngOnDestroy(): void {
		clearTimeout(this.timeSnackBar);
	}

	onSubmit() {
		this.confMsg = "Well Done, Your Form Has Submitted Successful";
		this.reactiveForm.reset();
		this.hideSnackbar();
	}

	undo() {
		this.store.dispatch(undo());
		this.undoMsg = "Careful, You Are Searching In Previous Data";
		this.hideSnackbar();
	}

	redo() {
		this.store.dispatch(redo());
		this.undoMsg = "Great, You Are Reverting Your Last Data";
		this.hideSnackbar();
	}

	hideSnackbar() {
		this.timeSnackBar = setTimeout(() => {
			this.undoMsg ? (this.undoMsg = null) : (this.confMsg = null);
		}, 1500);
	}
}
