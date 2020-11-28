import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Proyecto } from 'src/app/models/Log';
import { CrudService } from 'src/app/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  proyectosBusq=[];
  busqueda:string="";
  nuevoProyecto:Proyecto=new Proyecto();
  proyectos:any;
  proyectoForm:FormGroup;
  private image:any;
  private video:any;
  private triptico:any;
  
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private firestore:AngularFirestore,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private route:Router,
    formBuilder:FormBuilder,private crud:CrudService,private dialog: MatDialog,private auth:AuthService) { 
    this.proyectoForm = formBuilder.group({
    titulo: '',
    area: '',
    lenguaje: '',
    descripcion: '',
    desarrolladores: '',
    contactos: '',
    semestre: '',
    año: '',
    imageProy: '',
    videoProy: '',
    tripticoProy: '',
  });
    this.proyectos= firestore.collection('Proyecto').snapshotChanges();}
  
  ngOnInit(): void {
    this.crud.getAllProys().subscribe(proys => (this.dataSource.data = proys));
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
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async cerrarSesion(){
    await this.auth.signOut();
    this.route.navigate(['admin/login'])
  }
  seleccionar(proyecto){
    this.nuevoProyecto=new Proyecto();
    this.nuevoProyecto.id=proyecto.id;
    this.proyectoForm.get('titulo').setValue(proyecto.data().titulo);
    this.proyectoForm.get('area').setValue(proyecto.data().area);
    this.proyectoForm.get('lenguaje').setValue(proyecto.data().lenguaje);
    this.proyectoForm.get('descripcion').setValue(proyecto.data().descripcion);
    this.proyectoForm.get('desarrolladores').setValue(proyecto.data().desarrolladores);
    this.proyectoForm.get('contactos').setValue(proyecto.data().contactos);
    this.proyectoForm.get('semestre').setValue(proyecto.data().semestre);
    this.proyectoForm.get('año').setValue(proyecto.data().año);
    this.proyectoForm.get('imageRef').setValue(proyecto.data().image);
    this.proyectoForm.get('videoRef').setValue(proyecto.data().video);
    this.proyectoForm.get('tripticoRef').setValue(proyecto.data().triptico);
  }
  
  async buscar(){
    if(this.busqueda.length>=2){
      this.proyectosBusq=[];
      this.proyectos.subscribe(data=>{
        for(let proyecto of data){
          var letras=(proyecto.payload.doc.data().area.split(" "));
          for(let letra of letras){ 
            if(letra.length>=2&&this.busqueda.length>=2){
              if(letra.slice(0,2).toLowerCase()==this.busqueda.slice(0,2).toLowerCase()){
                this.proyectosBusq.push(proyecto); 
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
      this.nuevoProyecto.titulo=await this.proyectoForm.get('titulo').value;
      this.nuevoProyecto.area=await this.proyectoForm.get('area').value;
      this.nuevoProyecto.lenguaje=await this.proyectoForm.get('lenguaje').value;
      this.nuevoProyecto.descripcion=await this.proyectoForm.get('descripcion').value;
      this.nuevoProyecto.desarrolladores=await this.proyectoForm.get('desarrolladores').value;
      this.nuevoProyecto.contactos=await this.proyectoForm.get('contactos').value;
      
        console.log('New post',this.nuevoProyecto);
        this.crud.preAddAndUpdateProy(this.nuevoProyecto, this.image, this.video, this.triptico);
        this.dialog.open(bien);
        this.proyectoForm.get('titulo').setValue(" ");
        this.proyectoForm.get('area').setValue(" ");
        this.proyectoForm.get('lenguaje').setValue(" ");
        this.proyectoForm.get('descripcion').setValue(" ");
        this.proyectoForm.get('desarrolladores').setValue(" ");
        this.proyectoForm.get('contactos').setValue(" ");
        this.proyectoForm.get('semestre').setValue(" ");
        this.proyectoForm.get('año').setValue(" ");
        this.proyectoForm.get('imageRef').setValue(" ");
        this.proyectoForm.get('videoRef').setValue(" ");
        this.proyectoForm.get('tripticoRef').setValue(" ");
  }
  async borrar(bien,error,id){
      this.crud.delProyecto(id)
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

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }

  handleVideo(event: any): void {
    this.video = event.target.files[0];
  }

  handleTriptico(event: any): void {
    this.triptico = event.target.files[0];
  }

}
