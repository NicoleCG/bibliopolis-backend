import { ItemPedido } from "./itemPedido";
import { Usuario } from "./usuario";

export class Pedido {
    constructor(
        public id: number,
        public usuario: Usuario,
        public fechaPedido: Date,
        public estado: string,
        public total: number,
        public items: ItemPedido[]
    ){}
}