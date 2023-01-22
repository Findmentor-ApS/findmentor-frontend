import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';

const routes: Routes = [
  {path:'', component:ProfileLayoutComponent, children:[
    {path: '', redirectTo:'edit-profile' ,pathMatch:'full' },
    {path:'edit-profile', component:EditProfileComponent},
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
