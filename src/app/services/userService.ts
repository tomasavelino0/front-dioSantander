import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment/enviroment';
import { Observable } from 'rxjs';
import { UserModel, postTransaction, postUser } from '../models/userModel';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    rootURL = environment.baseUrl;

    getUsers(): Observable<UserModel> {
        return this.http.get<UserModel>(this.rootURL + '/users');
    }

    addUser(user: postUser) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(this.rootURL + '/users', user, httpOptions,);
    }

    getUserByDocument(document: string) {
        return this.http.get(this.rootURL + `/users/document?document=${document}`);
    }

    addTransaction(transaction: postTransaction) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(this.rootURL + '/transactions', transaction, httpOptions,);
    }
}