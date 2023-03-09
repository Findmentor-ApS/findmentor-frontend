import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ChatLayoutComponent } from './chat-layout/chat-layout.component';
import { MessagingComponent } from './messaging/messaging.component';

const routes: Routes = [
  {path:'', component:ChatLayoutComponent, canActivate: [AuthGuard], children:[
    {path: '', redirectTo:'message' ,pathMatch:'full'},
    {path:'message', component:MessagingComponent},
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
