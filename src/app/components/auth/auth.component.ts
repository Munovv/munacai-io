import { Component, OnInit } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from "@angular/router"
import Swal from 'sweetalert2'

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

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit() {
      if (localStorage.getItem('currentUser') !== null) {
        this.location('/profile')
      }
      document.getElementsByTagName('body')[0].classList.add("bodyman")
    }

    authUser(): boolean {
      this.http.post('http://localhost:88/auth', this.authFormModel)
      .subscribe(
        res => {
          let message: any = res
          if (message.type === 'error') {
            Swal.fire({
              title: 'Ошибка',
              text: message.message,
              icon: 'error',
              showCancelButton: false,
              confirmButtonText: 'Закрыть',
            })
          } else {
            this.user = res
            localStorage.setItem('currentUser', JSON.stringify(this.user));
            this.router.navigate(['/profile'])
          }
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
          let message: any = res
          if (message.type = "error") {
            Swal.fire({
              title: 'Ошибка',
              text: message.message,
              icon: 'error',
              showCancelButton: false,
              confirmButtonText: 'Закрыть',
            })
          } else {
            this.user = res
            localStorage.setItem('currentUser', JSON.stringify(this.user));
            this.router.navigate(['/profile'])
          }
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
