import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { Libro } from './models/Log';
import { Venta } from './models/Venta';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private afs: AngularFirestore,
    private router: Router) { }
  async modificarLibro(libro:Libro):Promise<any>{
      try{
        await this.afs.collection("Libros").doc(libro.id).update({
          "area":libro.area,
          "descripcion":libro.descripcion,
          "empleado":libro.empleado,
          "observacion":libro.observacion,
          "titulo":libro.titulo
        })
        return true;
      }
      catch(e){
        console.log(e);
        return false;

      }
    }
    async addLibro(libro:Libro):Promise<any>{
      try{
        await this.afs.collection("Libros").add({
          "area":libro.area,
          "descripcion":libro.descripcion,
          "empleado":libro.empleado,
          "observacion":libro.observacion,
          "titulo":libro.titulo
        })
        return true;
      }
      catch(e){
        console.log(e);
        return false;

      }
    }
    async delLibro(id:string):Promise<any>{
      try{
        await this.afs.collection("Libros").doc(id).delete();
        return true;
      }
      catch(e){
        console.log(e);
        return false;

      }
    }
}
