import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  tipo:Boolean=true;
  logueado:Boolean=false;
  constructor(private breakpointObserver: BreakpointObserver,
    private route:Router,
    private location: Location,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth) {
      route.events.subscribe((val) => {
        if(location.path() != ''){
          if(location.path().split("/")[1]==="user"){
            this.tipo=false;
          }
          else{
            this.tipo=true;

          }
        } else {
          this.tipo=true;
        }
      });
    this.afAuth.authState.subscribe(
      {
        next:(next)=>{
          console.log(next);
          if(next!=null){
          this.logueado=true;}
          else{
            this.logueado=false;
          }
         },
         
        
        error:(error)=>{
          this.logueado=false;
          console.log(error);
        }
      }
    )
  }

}
