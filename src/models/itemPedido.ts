import { Libro } from "./libro";

export class ItemPedido {
    constructor(
        public libro: Libro,
        public cantidad: number
    ){}
}