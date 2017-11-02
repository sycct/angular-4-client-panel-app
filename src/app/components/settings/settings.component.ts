import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings;

  constructor(
    private settingsService: SettingsService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.settings = this.settingsService.settings;
  }

  onSubmit() {
    this.settingsService.settings = this.settings;
    this.flashMessagesService.show('Settings 保存了', { cssClass: 'alert-success', timeout: 4000 });
  }

}
