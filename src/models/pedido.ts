import { ItemPedido } from "./itemPedido";

export class Pedido {
    constructor(
        public id: number,
        public usuario: string, // Se asume que corresponde al ID del usuario
        public fechaPedido: Date,
        public estado: string,
        public total: number,
        public items: ItemPedido[]
    ){}
}