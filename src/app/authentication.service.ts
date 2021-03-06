import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
              private router: Router) { }


  public login(username: string, password: string): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    return this.http.get<any>('/api/user', {headers: headers})
      .pipe(map((user: any) => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  public logout(): void {
    this.http.post<any>('/api/logout', '').subscribe(
      (response: any) => {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public getCurrentUser(): any {
    return localStorage.getItem('currentUser');
  }

}
