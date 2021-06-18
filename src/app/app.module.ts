import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthComponent } from './components/auth/auth.component'
import { ProfileComponent } from './components/profile/profile.component'
import { NotFoundComponent } from './components/not-found/not-found.component';

const appRoutes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [ AppComponent, AuthComponent, ProfileComponent, NotFoundComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgbModule,
    SweetAlert2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
