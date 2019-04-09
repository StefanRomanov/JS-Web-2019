import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Furniture from '../models/Furniture';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  constructor(private http: HttpClient) { }

  getAllFurniture() {
    return this.http.get<Furniture[]>('http://localhost:5000/furniture/all');
  }

  getFurniture(id) {
    return this.http.get<Furniture>('http://localhost:5000/furniture/details/' + id);
  }

  getUserFurniture() {
    return this.http.get<Furniture[]>('http://localhost:5000/furniture/user');
  }

  deleteFurniture(id) {
    return this.http.delete('http://localhost:5000/furniture/delete/' + id)

  }

  addFurniture(payload) {
    return this.http.post('http://localhost:5000/furniture/create', payload);
  }
}
