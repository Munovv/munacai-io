import { Component, OnInit } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

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

    headers: HttpHeaders

    constructor(private http: HttpClient) {
      this.headers = new HttpHeaders().set('Authorization', 'token-munacai-12')
    }

    ngOnInit() { }

    authUser(): boolean {
      this.http.post('http://munacai.service/authUser',
                      this.authFormModel,
                      { headers: this.headers }
      )
      return false
    }

    regUser(): boolean {
      this.http.post('http://munacai.service/regUser',
                      this.regFormModel,
                      { headers: this.headers }
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
}
