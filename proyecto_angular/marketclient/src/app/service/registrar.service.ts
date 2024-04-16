import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/Cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  constructor(private http:HttpClient) { }

  registrar(cliente:Cliente):Observable<any>{
    let url="http://localhost:8000/registrar";
    return this.http.post(url,cliente);
  }
}
