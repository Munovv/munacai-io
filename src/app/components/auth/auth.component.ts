import { Component, OnInit } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from "@angular/router"

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

    authFormModel: any = {
      email: '',
      password: ''
    }

    regFormModel: any = {
      username: '',
      email: '',
      password: ''
    }

    user: any = {
      email: null,
      username: null,
      token: null,
      session: null
    }

    constructor(private http: HttpClient, private router: Router) {
      if (localStorage.getItem('currentUser') !== null) {
        this.location('/profile')
      }
      document.getElementsByTagName('body')[0].classList.add("bodyman")
    }

    ngOnInit() { }

    authUser(): boolean {
      this.http.post('http://localhost:88/auth', this.authFormModel)
      .subscribe(
        res => {
          this.user = res
          localStorage.setItem('currentUser', JSON.stringify(this.user));
          this.router.navigate(['/profile'])
        },
        err => {
          console.error(err)
        }
      )
      return false
    }

    regUser(): boolean {
      this.http.post('http://localhost:88/reg', this.regFormModel)
      .subscribe(
        res => {
          this.user = res
          localStorage.setItem('currentUser', JSON.stringify(this.user));
          this.router.navigate(['/profile'])
        },
        err => {
          console.log(err)
        }
      )
      return false
    }

    showRegForm(): void {
      let container = document.getElementById('container')
      if (container) {
          container.classList.add("right-panel-active");
      }
    }

    showAuthForm(): void {
      let container = document.getElementById('container')
      if (container) {
          container.classList.remove("right-panel-active");
      }
    }

    location(url: string): void {
      this.router.navigate([url]);
    }
}
