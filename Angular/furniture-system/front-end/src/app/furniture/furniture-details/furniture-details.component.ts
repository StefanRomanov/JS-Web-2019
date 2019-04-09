import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import Furniture from '../../models/Furniture';
import {FurnitureService} from '../furniture.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-furniture-details',
  templateUrl: './furniture-details.component.html',
  styleUrls: ['./furniture-details.component.css']
})
export class FurnitureDetailsComponent implements OnInit {

  furniture$: Observable<Furniture>;

  constructor(private furnitureService: FurnitureService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.furniture$ = this.furnitureService.getFurniture(this.activatedRoute.snapshot.params.id);
  }

}
