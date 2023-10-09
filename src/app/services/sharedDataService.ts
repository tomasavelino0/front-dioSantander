import { Injectable } from '@angular/core';
import { UserModel } from '../models/userModel';

@Injectable({
    providedIn: 'root',
})
export class SharedDataService {
    // private storageKey = 'userData';
    private userData: any;

    // constructor() {
    //     const storedData = localStorage.getItem(this.storageKey);
    //     this.userData = storedData ? JSON.parse(storedData) : null;
    // }

    getUserData(): any {
        return this.userData;
    }

    setUserData(data: any): void {
        this.userData = data;
    }
}
