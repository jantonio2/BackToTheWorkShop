import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: 'app-videos',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements OnInit {
  proyectos:any;
  url: string;
  constructor(private firestore:AngularFirestore, private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.proyectos= this.firestore.collection('Proyecto').snapshotChanges();
  }
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
