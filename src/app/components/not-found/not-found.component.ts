import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

    private router: Router;

    constructor(router: Router) {
      this.router = router;
    }

    location(url: string): void {
      this.router.navigate([url]);
    }

}
