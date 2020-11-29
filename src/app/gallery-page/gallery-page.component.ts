import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from "@angular/platform-browser";
import { map , take} from 'rxjs/operators';
@Component({
  selector: 'app-videos',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements OnInit {
  searchText:string;
  proyectos:any;
  url: string;
  constructor(private firestore:AngularFirestore, private sanitizer: DomSanitizer) { 
    this.firestore.collection('items').valueChanges().pipe(take(1));
  }
  ngOnInit(): void {
    this.proyectos= this.firestore.collection('Proyecto').snapshotChanges().pipe(
     map(actions => actions.map(a => a.payload.doc.data()))
    );
  }
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
