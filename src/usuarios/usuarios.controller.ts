import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from 'src/models/usuario';
import { Response } from 'express';

@Controller('usuarios')
export class UsuariosController {
    constructor( private readonly servicio:UsuariosService){}

    // Registrar nuevo usuario
    @Post()
    crearUsuario(@Body() usuario: Usuario): void {
        this.servicio.crearUsuario(usuario);
    }

    // Obtener usuario según id 
    @Get(':id')
    obtenerUsuarioId(@Param('id') id: number, @Res() response: Response): any {
        try {
            const usuario: Usuario = this.servicio.obtenerUsuarioId(id);
            
            if (!usuario){
                response.status(404).send('No se encuentra usuario solicitado');
            } else {
                response.status(200).send(usuario);
            }

        } catch (error) {
            response.status(500).send('Error al obtener el usuario');
        } 
    }

    // Obtener usuarios
    @Get()
    obtenerUsuarios(){
        return this.servicio.obtenerUsuarios();
    }

    // Eliminar usuario según su id
    @Delete(':id')
    eliminarUsuario(@Param('id') id: number){
        this.servicio.eliminarUsuario(id);
    }
}
