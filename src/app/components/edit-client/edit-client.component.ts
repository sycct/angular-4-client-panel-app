import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client;
  disableBalanceOnEdit = false;

  constructor(
    public clientService: ClientService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService,
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingsService.settings.disableBalanceOnEdit;
    // 获取ID
    this.id = this.route.snapshot.params['id'];
    // 获取Client
    this.clientService.getOne(+this.id).subscribe(
      client => {
        this.client = client;
      }
    );
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (!valid) {
      this.flashMessagesService.show('请正确输入表单', { cssClass: 'alert alert-danger', timeout: 4000 });
      this.router.navigate(['/edit-client', this.id]);
    } else {
      this.clientService.update(+this.id, value).subscribe(
        client => {
          console.log(client);
          this.flashMessagesService.show('更新客户成功', { cssClass: 'alert alert-success', timeout: 4000 });
          this.router.navigate(['/client', this.id]);
        }
      );
    }
  }
}
