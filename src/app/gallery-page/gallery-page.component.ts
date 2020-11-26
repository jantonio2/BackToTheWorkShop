import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-videos',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements OnInit {
  proyectos:any;
  constructor(private firestore:AngularFirestore) { }
  ngOnInit(): void {
    this.proyectos= this.firestore.collection('Proyecto').snapshotChanges();
  }
}
