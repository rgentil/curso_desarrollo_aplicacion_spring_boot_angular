import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../model/Categoria';
import { Producto } from '../../model/Producto';
import { ProcesarPedidoService } from '../../service/procesar-pedido.service';
import { CestaItem } from '../../model/CestaItem';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-procesar-pedido',
  templateUrl: './procesar-pedido.component.html',
  styleUrl: './procesar-pedido.component.css'
})

export class ProcesarPedidoComponent implements OnInit {

  categorias:Categoria[];
  productos:Producto[];
  idCategoriaSel:number;
  cesta:CestaItem[];

  constructor(private procesarPedidoService:ProcesarPedidoService, private menuComponent:MenuComponent){

  }

  ngOnInit(): void {
    this.procesarPedidoService.cotegorias().subscribe(c=>this.categorias=c);
    this.cesta = [];
    //throw new Error('Method not implemented.');
  }

  productosCategoria(): void {
    this.procesarPedidoService.productosCategorias(this.idCategoriaSel).subscribe(p=>{
      this.productos=p;
      this.actualizarStock();
    });
  }

  actualizarStock(){
    this.productos.forEach(p=>{
      this.cesta.forEach(c=>{
        if (c.producto.idProducto == p.idProducto){
          p.stock = p.stock - c.unidades;
        }
      })
    }
    )
  }

  agregarProductoCesta(producto:Producto){
    if (producto.stock >= producto.unidades){
      //Se actualiza stock del producto
      producto.stock = producto.stock - producto.unidades;
      let c = new CestaItem();
      c.producto = producto;
      c.unidades = producto.unidades;
      this.cesta.push(c);
    }else{
      alert("No hay suficiente stock");
    }
  }

  eliminarProductoCesta(pos:number){
    //Se guarda la cesta en donde esta el producto
    let c = this.cesta[pos];
    //Se elimina de la cesta el producto
    this.cesta.splice(pos,1);
    //Busco el producto
    let producto = this.productos.find(p=>p.idProducto = c.producto.idProducto);
    //Actualizo stock
    producto.stock = Number(producto.stock) + Number(c.unidades);
  }

  procesarPedido(){
    this.procesarPedidoService.enviarPedido(this.cesta, this.menuComponent.cliente.usuario).subscribe({
      next:r=>alert("Pedido procesado"),
      error:e=>alert("No se pudo procesar")
    });
  }

}
