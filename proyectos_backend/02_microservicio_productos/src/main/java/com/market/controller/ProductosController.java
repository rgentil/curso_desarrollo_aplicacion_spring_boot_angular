package com.market.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.market.model.Categoria;
import com.market.model.Producto;
import com.market.service.ProductosService;

@RestController
@CrossOrigin("*")
public class ProductosController {

	@Autowired
	ProductosService productosService;
	
	@GetMapping(value = "categorias", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Categoria>> categorias(){
		return new ResponseEntity<>(productosService.categorias(), HttpStatus.OK);
	}
	
	@GetMapping(value = "productos", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Producto>> productos(@RequestParam("idCategoria") int idCategoria){
		return new ResponseEntity<>(productosService.productosPorCategorias(idCategoria), HttpStatus.OK);
	}
	
	@GetMapping(value = "producto", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Producto> producto(@RequestParam("idProducto") int idProducto){
		return new ResponseEntity<>(productosService.productoPorCodigo(idProducto), HttpStatus.OK);
	}
	
	@PutMapping(value = "producto")
	public ResponseEntity<Void> actualizarProducto(@RequestParam("idProducto") int idProducto, @RequestParam("unidades") int unidades){
		Producto producto = productosService.actualiarStock(idProducto, unidades);
		if (producto != null) {
			return new ResponseEntity<Void>(HttpStatus.OK);
		}else {
			return new ResponseEntity<Void>(HttpStatus.CONFLICT);
		}
	}
	
	
}
