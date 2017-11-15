import { ComponentsModule } from "./../../components/components.module";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ContactPage } from "./contact";

@NgModule({
    declarations: [
        ContactPage
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(ContactPage)
    ]
})

export class ContactPageModule { }