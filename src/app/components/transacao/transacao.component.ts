import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedDataService } from 'src/app/services/sharedDataService';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-transacao',
  templateUrl: './transacao.component.html',
  styleUrls: ['./transacao.component.css']
})
export class TransacaoComponent implements OnInit {
  userData: any;
  form: any;
  documentNotFound: boolean;
  sucessTransaction: boolean;
  balance: number;
  notBalance: boolean;

  constructor(
    private sharedDataService: SharedDataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService) {

    this.form = this.formBuilder.group({
      value: [0, Validators.required],
      senderId: [0, [Validators.required]],
      document: ['', [Validators.required]],
      receiverId: [0, [Validators.required]],
    });
    this.balance = 0;
    this.documentNotFound = false;
    this.sucessTransaction = false;
    this.notBalance = false;
  }

  ngOnInit() {
    this.userData = this.sharedDataService.getUserData();
    this.balance = this.userData.balance
  }

  submitTransaction(): void {
    const document = this.form.value.document;
    this.sucessTransaction = false;
    this.documentNotFound = true;
    this.notBalance = false;
    this.userService.getUserByDocument(document).subscribe((data: any) => {
      if (data.id) {
        this.documentNotFound = false;
        this.form.value.receiverId = data.id;
        const transaction = {
          value: this.form.value.value,
          senderId: this.userData.id,
          receiverId: this.form.value.receiverId
        }

        this.userService.addTransaction(transaction).subscribe((data: any) => {

          if (data.id) {
            this.sucessTransaction = true;
            this.balance -= this.form.value.value
          }
        })
      }
    });

    if (this.balance < this.form.value.value) {
      this.notBalance = true;
    }
  }
}
