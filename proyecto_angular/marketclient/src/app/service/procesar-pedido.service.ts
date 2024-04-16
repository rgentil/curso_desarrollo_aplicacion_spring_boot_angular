import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CestaItem } from '../model/CestaItem';

@Injectable({
  providedIn: 'root'
})
export class ProcesarPedidoService {

  constructor(private http:HttpClient) { }

  cotegorias():Observable<any>{
    let url = "http://localhost:8001/categorias";
    return this.http.get(url);
  }

  productosCategorias(idCategoria:number):Observable<any>{
    let url = "http://localhost:8001/productos";
    let params = new HttpParams();
    params = params.append("idCategoria",idCategoria);
    return this.http.get(url,{"params":params});
  }

  enviarPedido(cesta:CestaItem[], usuario:string):Observable<any>{
    let url = "http://localhost:8002/pedido";
    let params = new HttpParams();
    params = params.append("usuario", usuario);
    return this.http.post(url, cesta, {"params":params});
  }
}
