import { Injectable, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { Proyecto } from './models/Log';
import { Observable } from 'rxjs';
import { Image, Video } from './models/media';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private imagePath: any;
  private downloadImageURL: Observable<string>;
  private videoPath: any;
  private downloadVideoURL: Observable<string>;


  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router) { }

    public getAllProys(): Observable<Proyecto[]> {
      return this.afs.collection("Proyecto")
        .snapshotChanges()
        .pipe(
          map(actions =>
            actions.map(a => {
              const data = a.payload.doc.data() as Proyecto;
              const id = a.payload.doc.id;
              return { id, ...data };
            })
          )
        );
    }
  /*async modificarProyecto(proyecto:Proyecto):Promise<any>{
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
    }*/
    private addProyecto(proyecto:Proyecto){
      try{
        //await this.afs.collection("Proyecto").add({
        const proyObj={"titulo":proyecto.titulo,
          "area":proyecto.area,
          "lenguaje":proyecto.lenguaje,
          "descripcion":proyecto.descripcion,
          "desarrolladores":proyecto.desarrolladores,
          "contactos":proyecto.contactos,
          "imageRef":this.imagePath,
          "imageProy":this.downloadImageURL,
          "videoRef":this.videoPath,
          "videoProy":this.downloadVideoURL,
        };
        if(proyecto.id){
          this.afs.collection("Proyecto").doc(proyecto.id).update(proyObj);
        }else{
          console.log('Entra add');
          this.afs.collection("Proyecto").add(proyObj);
        }
      }
      catch(e){
        console.log("Error es este: "+ e);

      }
    }

    public preAddAndUpdateProy(proy: Proyecto, image: Image, video: Video): void {
      console.log('Entra preAdd');
      this.uploadImageVideo(proy, image, video);
    }

    private uploadImageVideo(proy: Proyecto, image: Image, video: Video) {
      console.log('Entra upload');
      this.imagePath = `images/${image.name}`;
      this.videoPath = `videos/${video.name}`;
      const fileRef = this.storage.ref(this.imagePath);
      const task = this.storage.upload(this.imagePath, image);
      const fileRef2 = this.storage.ref(this.videoPath);
      const task2 = this.storage.upload(this.videoPath, video);
      task.snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(urlImage => {
              this.downloadImageURL = urlImage;
              this.addProyecto(proy);
            });
          })
        ).subscribe();
      task2.snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef2.getDownloadURL().subscribe(urlVideo => {
              this.downloadVideoURL = urlVideo;
              this.addProyecto(proy);
            });
          })
        ).subscribe();
     
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
