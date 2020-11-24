import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { Proyecto } from './models/Log';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private afs: AngularFirestore,
    private router: Router) { }
  async modificarProyecto(proyecto:Proyecto):Promise<any>{
      try{
        await this.afs.collection("Proyecto").doc(proyecto.id).update({
          "titulo":proyecto.titulo,
          "area":proyecto.area,
          "lenguaje":proyecto.lenguaje,
          "descripcion":proyecto.descripcion,
          "desarrolladores":proyecto.desarrolladores,
          "contactos":proyecto.contactos
        })
        return true;
      }
      catch(e){
        console.log(e);
        return false;

      }
    }
    async addProyecto(proyecto:Proyecto):Promise<any>{
      try{
        await this.afs.collection("Proyecto").add({
          "titulo":proyecto.titulo,
          "area":proyecto.area,
          "lenguaje":proyecto.lenguaje,
          "descripcion":proyecto.descripcion,
          "desarrolladores":proyecto.desarrolladores,
          "contactos":proyecto.contactos
        })
        return true;
      }
      catch(e){
        console.log(e);
        return false;

      }
    }
    async delProyecto(id:string):Promise<any>{
      try{
        await this.afs.collection("Proyecto").doc(id).delete();
        return true;
      }
      catch(e){
        console.log(e);
        return false;

      }
    }
}
