import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { CrudComponent } from './admin/crud/crud.component';


const routes: Routes = [
  {
    path:"admin",
    children:[
      {
        path:"login",
        component:LoginComponent
      },
      {
        path:"crud",
        component:CrudComponent
      }
    ]
  },
  
  {
    path:"**",
    component:LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
