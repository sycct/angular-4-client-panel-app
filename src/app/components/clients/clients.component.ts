import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public clients: Client[];
  public total: number;

  constructor(private service: ClientService) { }

  ngOnInit() {
    this.service.getAll().subscribe(
      clients => {
      this.clients = clients;
      this.getTotal();
      }
    );
  }

  getTotal() {
    this.total = this.clients.reduce((previous, current) => previous + current.balance, 0);
  }

}
