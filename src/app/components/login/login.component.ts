import { ApiResult } from './../../models/api-result.interface';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { concatMap } from 'rxjs/operators';
import { ApiRequest } from 'src/app/models/api-request.interface';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  constructor(private queryService: QueryService) { }

  requestModel: ApiRequest = { email: 'sean@test.com', password: 'SeanPass' };

  ngOnInit(): void {
  }

  login(){
    const getMessageObservable = this.queryService.getToken(this.requestModel).pipe( concatMap( result =>{
      return this.queryService.getGreeting((result as ApiResult).data.token);
    }))
    getMessageObservable.subscribe( message =>{

    })

  }
}
