package com.market.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.market.model.Categoria;
import com.market.model.Producto;
import com.market.repository.CategoriasRepository;
import com.market.repository.ProductosRepository;

@Service
public class ProductosServiceImpl implements ProductosService {

	@Autowired
	ProductosRepository productoRepository;
	@Autowired
	CategoriasRepository categoriasRepository;
	
	@Override
	public List<Categoria> categorias() {
		return categoriasRepository.findAll();
	}

	@Override
	public List<Producto> productosPorCategorias(int idCategoria) {
		return productoRepository.findByIdCategoria(idCategoria);
	}

	@Override
	public Producto actualiarStock(int idProducto, int unidades) {
		Producto producto = this.productoPorCodigo(idProducto);
		if (producto != null & producto.getStock() >= unidades) {
			producto.setStock(producto.getStock() - unidades);
			productoRepository.save(producto);
			return producto;
		}
		return null;
	}

	@Override
	public Producto productoPorCodigo(int idProducto) {
		return productoRepository.findById(idProducto).orElse(null);
	}

}
