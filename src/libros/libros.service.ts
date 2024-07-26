import { Injectable } from '@nestjs/common';
import { Libro } from 'src/models/libro';

@Injectable()
export class LibrosService {
    private libros: Libro[] = [];

    // Crear un libro nuevo con ISBN único
    crearLibro(nuevoLibro): void {
        if (!this.libros.find(libro => libro.isbn == nuevoLibro.isbn)){
            this.libros.push(nuevoLibro);
        }
    }

    // Obtener libro según ISBN
    obtenerLibroISBN(isbn): Libro {
        for (let libro of this.libros){
            if (libro.isbn == isbn){
                return libro;
            }
        }
        return null;
    }

    // Obtener todos los libros filtrados por autor y/o genero
    obtenerLibros(autor, genero): Libro[] {
        let libros: Libro[] = this.libros;

        // Filtrar por autor
        if (autor){
            libros = libros.filter(libro => libro.autor == autor);
        }
        // Filtrar por genero
        if (genero){
            libros = libros.filter(libro => libro.genero == genero);
        }

        return libros;
    }
    // Eliminar un libro según su ISBN
    eliminarLibro(isbn: string): void {
        for (let i=0; i < this.libros.length; i++){
            if (this.libros[i].isbn == isbn){
                this.libros.splice(i-1, 1);
            }
        }
    }
}
