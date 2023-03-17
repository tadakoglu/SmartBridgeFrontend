import { ApiResult } from './../models/api-result.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiRequest } from '../models/api-request.interface';

@Injectable({
  providedIn: 'root',
})
export abstract class QueryService {
  private readonly APIUrl = 'http://66.70.229.82:8181/';

  constructor(private httpClient: HttpClient) { }

  getToken<ApiResult>(body: ApiRequest): Observable<ApiResult> {
    return this.httpClient
      .post<ApiResult>(this.APIUrl + 'Authorize', body, {})
      .pipe(catchError(this.handleError));
  }

  getGreeting<ApiResult>(token: string): Observable<ApiResult> {
    return this.httpClient
      .get<ApiResult>(this.APIUrl + 'GetGreeting', { headers: { "x-user-token": token } },)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
