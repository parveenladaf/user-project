import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};



@Injectable({
  providedIn: 'root'
})
export class UserService {


  USER_BASE_URL_DEV = environment.USER_BASE_URL_DEV;

  constructor(private httpClient: HttpClient, private matSnackBar: MatSnackBar) { }


  userSave(body) {
    const userUrl = `${this.USER_BASE_URL_DEV}/user/add`;
    return this.httpClient.post(userUrl, body);

  }

  getUsers() {
    const userUrl = `${this.USER_BASE_URL_DEV}/users`;
    return this.httpClient.get(userUrl, httpOptions);
  }


  deleteUser(id) {
    const userUrl = `${this.USER_BASE_URL_DEV}/user/`;
    return this.httpClient.delete(userUrl + id, httpOptions);
  }

  openToast(message, action, duration?: number) {
    message = message.match(/.{1,65}/g).join(' ');
    this.matSnackBar.open(message, action, {
      panelClass: ['blue-snackbar']
    });
  }
}
