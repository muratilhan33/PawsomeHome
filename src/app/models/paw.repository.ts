import { Injectable } from "@angular/core";
import { Paw } from "./paw.model";
import { RestService } from "./rest.service";
import { Category } from "./category.model";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PawRepository {
    private paws: Paw[] = [];
    private pawsSubject = new BehaviorSubject<Paw[]>([]);

    paws$ = this.pawsSubject.asObservable();

    constructor(private restService: RestService) {
        this.restService.getPaws().subscribe(paws => {
            this.paws = paws;
            this.pawsSubject.next(this.paws);
        });
    }

    ngOnInit(): void {

    }

    getPaw(id: number): Paw {
        return this.paws.find(i => i.id === id)!;
    }

    getPaws(category: Category | null): Paw[] {
        if (category) {
            return this.paws.filter(p => p.category == category.name);
        }
        else {
            return this.paws;
        }
    }
}