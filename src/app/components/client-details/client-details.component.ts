import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { PatchModel } from '../../models/PatchModel';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    public clientService: ClientService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    // 获取ID
    this.id = this.route.snapshot.params['id'];
    // 获取Client
    this.clientService.getOne(+this.id).subscribe(
      client => {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
        this.client = client;
      }
    );
  }

  updateBalance(id: string) {
    // 更新客户的余额
    this.clientService.patch(+id, [{ op: 'replace', path: '/balance', value: this.client.balance }])
      .subscribe(() => {
        this.showBalanceUpdateInput = false;
        this.flashMessagesService.show('更新余额成功', { cssClass: 'alert alert-success', timeout: 4000 });
        this.router.navigate(['/client', id]);
      });
  }

  onDeleteClick() {
    if (confirm('确定要删除?')) {
      this.clientService.delete(+this.id).subscribe(() => {
        this.flashMessagesService.show('客户删除成功', { cssClass: 'alert alert-success', timeout: 4000 });
        this.router.navigate(['/']);
      });
    }
  }
}
