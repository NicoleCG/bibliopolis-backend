import { Injectable } from '@nestjs/common';
import { Pedido } from 'src/models/pedido';

@Injectable()
export class PedidosService {
    private pedidos: Pedido[] = [];

    // Crear nuevo pedido
    crearPedido(pedido): Pedido {
        // Parametros iniciales
        let total: number = 0;
        let estadoPedido: string = 'pendiente'; // Se asigna como estado inicial

        // Calcular total pedido y revisar stock
        for (let item of pedido.items){
            let libro = item.libro;
            let cantidad = item.cantidad;

            // Revisar stock sea mayor que cantidad solicitada
            if (cantidad >= libro.stock){
                estadoPedido = 'Sin stock';
                return pedido;
            } else {
                total += cantidad * libro.precio;
            }
        }
        // Almacenar datos del pedido
        pedido.id = this.pedidos.length + 1;
        pedido.fechaPedido = new Date();
        pedido.estado = estadoPedido;
        pedido.total = total;

        this.pedidos.push(pedido) // Almacenar pedido

        return pedido;
    }
    // Obtener pedido según id
    obtenerPedidoId(id): Pedido{
        for (let pedido of this.pedidos){
            if (pedido.id == id){
                return pedido;
            }
        }
    }
    // Obtener todos los pedidos, filtrando por estado y/o usuario
    obtenerPedidos(estado, usuario): Pedido[] {
        let pedidos: Pedido[] = this.pedidos;

        // Filtrar por estado
        if (estado){
            pedidos = pedidos.filter(pedido => pedido.estado == estado);
        }
        // Filtrar por genero
        if (usuario){
            pedidos = pedidos.filter(pedido => pedido.usuario == usuario);
        }

        return pedidos;
    }

    // Modificar estado del pedido por id
    modificarEstadoPedido(id, estado): string {
        let pedido = this.obtenerPedidoId(id);
        let estadoActual = pedido.estado;

        if (
            (estadoActual == 'pendiente' && estado == 'en proceso') ||
            (estadoActual == 'en proceso' && estado == 'enviado') || 
            (estadoActual == 'enviado' && estado == 'entregado') || 
            (estadoActual == 'entregado' && estado == 'entregado')
        ){
            pedido.estado = estado;
        } else {
            estado = 'estado incorrecto';
        }

        return estado;
    }

}