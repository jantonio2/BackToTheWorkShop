import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { CrudComponent } from './admin/crud/crud.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';



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
    path:'project/:proId',
    component: ProjectPageComponent
  },
  {
    path:'homePage',
    component:HomePageComponent
  },
  {
    path:'galleryPage',
    component:GalleryPageComponent
  },
  {
    path:'aboutUsPage',
    component:AboutUsPageComponent
  },
  {
    path:'**',
    component:HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
