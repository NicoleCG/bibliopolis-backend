import { Injectable } from '@nestjs/common';
import { Pedido } from 'src/models/pedido';
import { Usuario } from 'src/models/usuario';
import { UsuarioDTO } from 'src/models/usuario.dto';

@Injectable()
export class UsuariosService {
    private usuarios: Usuario[] = [];

    // Crear un usuario
    crearUsuario(nuevoUsuario: Usuario): void {
        // Revisar que el correo usuario sea unico
        if (!this.usuarios.find(usuario => usuario.correoElectronico == nuevoUsuario.correoElectronico)){
            let pedidos: Pedido[] = [];

            nuevoUsuario.id = this.usuarios.length + 1;  
            nuevoUsuario.historialPedidos = pedidos;
            
            this.usuarios.push(nuevoUsuario);
            }
    }

    // Obtener usuario según id (devolver error 404 si no existe)
    obtenerUsuarioId(id: number): Usuario{
        for (let usuario of this.usuarios){
            if (usuario.id == id){
                return usuario;
            }
        }
        return null;
    }

    // Obtener todos los usuarios (excluir password)
    obtenerUsuarios(): UsuarioDTO[] {
        let usuariosDTO: UsuarioDTO[] = [];

        for (let usuario of this.usuarios){
            usuariosDTO.push(
                new UsuarioDTO(
                    usuario.id, 
                    usuario.nombre, 
                    usuario.correoElectronico,
                    usuario.direccion,
                    usuario.historialPedidos
                )
            )
        }

        return usuariosDTO;
    }

    // Eliminar usuario según id
    eliminarUsuario(id){
        for (let i=0; i < this.usuarios.length; i++){
            if (this.usuarios[i].id == id){
                this.usuarios.splice(i-1, 1);
            }
        }
    }
}
