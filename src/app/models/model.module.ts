import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RestService } from "./rest.service";
import { CategoryRepository } from "./category.repository";
import { PawRepository } from "./paw.repository";

@NgModule({
    imports: [HttpClientModule],
    providers: [RestService, CategoryRepository, PawRepository]
})

export class ModelModule { }