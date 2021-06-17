import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

    user: any = localStorage.getItem('currentUser')

    constructor(private router: Router, private http: HttpClient) {
      if (this.user === null) {
        this.location('/')
      }
      this.user = JSON.parse(this.user)
      document.getElementsByTagName('body')[0].classList.remove("bodyman")
      document.getElementsByTagName('body')[0].classList.add("profile-body")
    }

    logout(): boolean {
      this.http.post('http://localhost:88/logout', this.user).subscribe(
        res => {
            localStorage.removeItem("currentUser")
            this.location('/')
        },
        err => {
          console.error(err)
        }
      )
      return false
    }

    location(url: string): void {
      this.router.navigate([url]);
    }

}
