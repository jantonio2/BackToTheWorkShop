import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  item: any;
  proyectos: any;
  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private firestore:AngularFirestore) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.item = params.get('proId');
    });
    this.proyectos= this.firestore.collection('Proyecto').snapshotChanges();
  }
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
