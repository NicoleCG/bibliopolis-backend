import { Body, Controller, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Pedido } from 'src/models/pedido';
import { Response } from 'express';

@Controller('pedidos')
export class PedidosController {
    constructor ( private readonly servicio: PedidosService){}

    // Crear nuevo pedido
    @Post()
    crearPedido(@Body() pedido: Pedido, @Res() response: Response): void {
        pedido = this.servicio.crearPedido(pedido);

        if (pedido.estado == 'Sin stock'){
            response.status(404).send('No hay suficiente stock para realizar pedido');
        }
        else {
            response.status(200).send(pedido);
        }
    }

    // Obtener pedido según id
    @Get(':id')
    obtenerPedidoId(@Param('id') id: string): Pedido{
        return this.servicio.obtenerPedidoId(id);
    }
    // Obtener todos los pedidos, filtrando por estado y/o usuario
    @Get()
    obtenerPedidos(
        @Query('estado') estado: string,
        @Query('usuario') usuario: string
    ): Pedido[] {
        return this.servicio.obtenerPedidos(estado, usuario);
    }

    // Modificar pedido por id
    @Put(':id')
    modificarEstadoPedido(
        @Param('id') id: number,
        @Body() modificacion: object,
        @Res() response: Response
    ): void {
        let estado = modificacion['estado'];
        let nuevoEstado = this.servicio.modificarEstadoPedido(id, estado);

        if (nuevoEstado == 'estado incorrecto'){
            response.status(400).send(estado);
        } else {
            response.status(200).send('Pedido modificado a: ' + nuevoEstado);
        }
    }
}
