import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { LibrosService } from './libros.service';
import { Libro } from 'src/models/libro';

@Controller('libros')
export class LibrosController {
    constructor( private readonly servicio:LibrosService){}

    // Crear un libro nuevo con ISBN único
    @Post()
    crearLibro( @Body() libro: Libro): void {
        this.servicio.crearLibro(libro);
    }

    // Obtener libro según ISBN
    @Get(':isbn')
    obtenerLibroISBN(@Param('isbn') isbn: string): Libro{
        return this.servicio.obtenerLibroISBN(isbn);
    }

    // Obtener todos los libros filtrados por autor y/o genero
    @Get()
    obtenerLibros(
        @Query('autor') autor: string, 
        @Query('genero') genero: string
    ){
        return this.servicio.obtenerLibros(autor, genero);
    }
    // Eliminar un libro según su ISBN
    @Delete(':isbn')
    eliminarLibro(@Param('isbn') isbn: string){
        this.servicio.eliminarLibro(isbn);
    }
}
