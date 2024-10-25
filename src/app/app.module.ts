import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.routes";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./Pages/home/home.component";
import { StoreModule } from "@ngrx/store";
import { formReducer } from "./Store/form/form.reducer";
import { SnackBarComponent } from './Shared/snack-bar/snack-bar.component';

@NgModule({
	declarations: [AppComponent, HomeComponent, SnackBarComponent],
	imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, StoreModule.forRoot({ reactiveForm: formReducer })],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
