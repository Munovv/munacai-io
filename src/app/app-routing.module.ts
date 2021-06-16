import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
