import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private route:Router,) { }
  iniciarSesion(){
    this.auth.googleSignin().then(
      (val)=>{
        console.log(val);
        this.route.navigate(['admin/crud']);
      }
    ).catch(
      (err)=>{
        console.log(err);
      }
    )
  }
  ngOnInit(): void {
    this.afAuth.authState.subscribe(
      {
        next:(next)=>{
          console.log(next);
          if(next!=null){
            this.route.navigate(['admin/crud'])}
          else{
          }
         },
         
        
        error:(error)=>{
          console.log(error);
        }
      }
    )
  }

}
