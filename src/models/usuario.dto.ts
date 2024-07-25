import { Pedido } from "./pedido";

export class UsuarioDTO {
    // Se excluye el password del usuario
    constructor(
        public id: number,
        public nombre: string,
        public correoElectronico: string,
        public direccion: Date,
        public historialPedidos: Pedido[]
    ){}
}