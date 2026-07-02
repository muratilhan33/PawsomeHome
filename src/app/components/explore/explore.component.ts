import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {

}
