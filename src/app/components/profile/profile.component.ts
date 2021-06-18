import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { NgForm } from '@angular/forms'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

    user: any   = localStorage.getItem('currentUser')
    url: string = 'http://localhost:88/'

    datePattern: string = '/(\d{2})\.(\d{2})\.(\d{4})/'

    selectedFile: any  = null
    userFiles: any     = null

    constructor(private router: Router, private http: HttpClient) {}

    ngOnInit() {
      if (this.user === null) {
        this.location('/')
      }

      this.user = JSON.parse(this.user)
      this.getFiles(this.user.session.user_id)

      document.getElementsByTagName('body')[0].classList.remove("bodyman")
      document.getElementsByTagName('body')[0].classList.add("profile-body")
    }

    handlerGetFiles(user: number): Promise<any> {
      return this.http.get(this.url + 'get-files=' + user).toPromise()
    }

    async getFiles(user: number): Promise<any> {
      let fBox = window.document.getElementById('files')!

      this.userFiles = await this.handlerGetFiles(user)
      for (var key in this.userFiles) {
        this.userFiles[key].created_at = new Date(this.userFiles[key].created_at * 1000)
      }
    }

    onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0]
    }

    handleFile(f: NgForm): boolean {

      if (this.selectedFile === null) {
        Swal.fire({
          title: 'Ошибка',
          text: "Вы не загрузили файл!",
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'Закрыть',
        })
        return false
      }

      const formD: FormData = new FormData()
      formD.append('userfile', this.selectedFile, this.selectedFile.name)
      formD.append('user', this.user.session.user_id)

      this.http.post(this.url+'file-upload', formD).subscribe(
        res => {
          f.reset()
          this.userFiles.unshift(res)
        }
      )
      return false;
    }

    logout(): boolean {
      this.http.post(this.url+'logout', this.user).subscribe(
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
