import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Libro } from 'src/app/models/Log';
import { CrudService } from 'src/app/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  librosBusq=[];
  busqueda:string="";
  nuevoLibro:Libro=new Libro();
  libros:any;
  libroForm:FormGroup;
  constructor(private firestore:AngularFirestore,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private route:Router,
    formBuilder:FormBuilder,private crud:CrudService,private dialog: MatDialog,private auth:AuthService) { 
    this.libroForm = formBuilder.group({
    titulo: '',
    descripcion: '',
    area:"",
    empleado:"",
    observacion:"",
  });
    this.libros= firestore.collection('Libros').snapshotChanges();}
  
  ngOnInit(): void {
    this.afAuth.authState.subscribe(
      {
        next:(next)=>{
          console.log(next);
          if(next!=null){}
          else{
            this.route.navigate(['admin/login'])
          }
         },
         
        
        error:(error)=>{
          this.route.navigate(['admin/login'])
          console.log(error);
        }
      }
    )
  }
  async cerrarSesion(){
    await this.auth.signOut();
    this.route.navigate(['admin/login'])
  }
  seleccionar(libro){
    this.nuevoLibro=new Libro();
    this.nuevoLibro.id=libro.id;
    this.libroForm.get('titulo').setValue(libro.data().titulo);
    this.libroForm.get('descripcion').setValue(libro.data().descripcion);
    this.libroForm.get('area').setValue(libro.data().area);
    this.libroForm.get('empleado').setValue(libro.data().empleado);
    this.libroForm.get('observacion').setValue(libro.data().observacion);
  }
  async modificar(bien,error){
    if(this.nuevoLibro.id!=null&&this.nuevoLibro.id!==""&&this.nuevoLibro.id!=="undefined"){
      this.nuevoLibro.area=await this.libroForm.get('area').value;
      this.nuevoLibro.descripcion=await this.libroForm.get('descripcion').value;
      this.nuevoLibro.empleado=await this.libroForm.get('empleado').value;
      this.nuevoLibro.observacion=await this.libroForm.get('observacion').value;
      this.nuevoLibro.titulo=await this.libroForm.get('titulo').value;
        this.crud.modificarLibro(this.nuevoLibro)
        .then((val)=>{
            if(val==true){
              this.dialog.open(bien);

            }else{
              this.dialog.open(error);
              
            }
        })        
        .catch(()=>{
          this.dialog.open(error);

        })
    }
  }
  async buscar(){
    if(this.busqueda.length>=3){
      this.librosBusq=[];
      this.libros.subscribe(data=>{
        for(let libro of data){
          var letras=(libro.payload.doc.data().descripcion.split(" "));
          for(let letra of letras){
            if(letra.length>=3&&this.busqueda.length>=3){
              if(letra.slice(0,3).toLowerCase()==this.busqueda.slice(0,3).toLowerCase()){
                this.librosBusq.push(libro); 
                break;             
              }
            }
          }
        }
      });
    }
    else{
    }
    
  }
  async agregar(bien,error){
      this.nuevoLibro.area=await this.libroForm.get('area').value;
      this.nuevoLibro.descripcion=await this.libroForm.get('descripcion').value;
      this.nuevoLibro.empleado=await this.libroForm.get('empleado').value;
      this.nuevoLibro.titulo=await this.libroForm.get('titulo').value;
      this.nuevoLibro.observacion=await this.libroForm.get('observacion').value;
        this.crud.addLibro(this.nuevoLibro)
        .then((val)=>{
            if(val==true){
              this.dialog.open(bien);

            }else{
              this.dialog.open(error);
              
            }
        })        
        .catch(()=>{
          this.dialog.open(error);

        })
  }
  async borrar(bien,error,id){
      this.crud.delLibro(id)
      .then((val)=>{
          if(val==true){
            this.dialog.open(bien);

          }else{
            this.dialog.open(error);
            
          }
      })        
      .catch(()=>{
        this.dialog.open(error);

      })
}

}
