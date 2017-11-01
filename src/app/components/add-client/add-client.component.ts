import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  public client: Client = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  public disableBalanceOnAdd = true;

  constructor(
    public flashMessagesService: FlashMessagesService,
    public router: Router,
    public clientService: ClientService
  ) { }

  ngOnInit() {
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      this.flashMessagesService.show('请正确输入表单', { cssClass: 'alert alert-danger', timeout: 4000 });
      this.router.navigate(['/add-client']);
    } else {
      this.clientService.create(value).subscribe(
        client => {
          console.log(client);
          this.flashMessagesService.show('新客户添加成功', { cssClass: 'alert alert-success', timeout: 4000 });
          this.router.navigate(['/']);
        }
      );
    }
  }
}
