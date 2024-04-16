import { Pedido } from '../../model/Pedido';
import { MenuComponent } from '../menu/menu.component';
import { ConsultarPedidosService } from './../../service/consultar-pedidos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultar-pedidos',
  templateUrl: './consultar-pedidos.component.html',
  styleUrl: './consultar-pedidos.component.css'
})
export class ConsultarPedidosComponent implements OnInit{

  pedidos:Pedido[];
  usuario:string;

  constructor(private consutlarPedidosService:ConsultarPedidosService, private menuComponent:MenuComponent){}

  ngOnInit(): void {
    this.pedidos = [];
    this.usuario = this.menuComponent.cliente.usuario;
    this.consutlarPedidosService.consultarPedidos(this.usuario).subscribe(r => {
      this.pedidos = r;
    });

  }

}
