package com.market.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.market.model.ElementosPedido;
import com.market.model.Pedido;
import com.market.repository.ElementosPedidoRepository;
import com.market.repository.PedidosRepository;

@Service
public class PedidosServiceImpl implements PedidosService {

	String urlProducto = "http://localhost:8001/";
	
	@Autowired
	RestTemplate restTemplate;
	
	@Autowired
	PedidosRepository pedidosRepository;
	
	@Autowired
	ElementosPedidoRepository elementosPedidosRepository;
	
	@Override
	public List<Pedido> pedidosUsuario(String usuario) {
		return pedidosRepository.findByUsuario(usuario);
	}

	@Override
	public Pedido guardarPedido(List<ElementosPedido> elementosPedido, String usuario) {
		try {
			//Creamos objeto Pedido y lo guardamos.
			Pedido pedido = new Pedido(0, usuario, new Date(), "pendiente", null);
			Pedido p = pedidosRepository.save(pedido);
			//Guardamos los objetos ElementosPedido
			elementosPedido.forEach(e->{
				e.setIdPedidoFk(p.getIdPedido());
				elementosPedidosRepository.save(e);
				//Ademas de guardar el elementosPedidos acutaliza el stcok
				//del producto correspondiente llamando al recurso del 
				//microservicio de producto
				UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(urlProducto + "producto")
						.queryParam("idProducto", e.getProducto().getIdProducto())
						.queryParam("unidades", e.getUnidades());
				restTemplate.put(builder.toUriString(), null);
			});
			return p;	
		}catch(Exception e) {
			return null;
		}
	}

}
