import { ApiResult } from './../../models/api-result.interface';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { concatMap } from 'rxjs/operators';
import { ApiRequest } from 'src/app/models/api-request.interface';
import { QueryService } from 'src/app/services/query.service';
import { webSocket } from 'rxjs/webSocket';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(private queryService: QueryService, private router: Router) {}

  requestModel: ApiRequest = { email: 'sean@test.com', password: 'SeanPass' };

  ngOnInit(): void {}

  login(): void {
    const getMessageObservable = this.queryService
      .getToken(this.requestModel)
      .pipe(
        concatMap((result) => {
          const token = (result as ApiResult).data.token;
          this.connectToWebSocket(token);
          return this.queryService.getGreeting(token);
        })
      );
    getMessageObservable.subscribe((message) => {
      this.showWelcome(message as string);
    });
  }

  showWelcome(message: string) {
    console.log(message);
  }

  logout(): void {
    this.router.navigate('/login')
  }

  connectToWebSocket(token: string) {
    const socket = webSocket('ws://66.70.229.82:8181/?' + token);
    socket.subscribe(
      (message) => {
        if (message == 'logout') {
          this.logout();
        }
      }, // Called whenever there is a message from the server.
      (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }
}
