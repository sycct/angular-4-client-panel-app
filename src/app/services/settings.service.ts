import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';

@Injectable()
export class SettingsService {

  private _settings: Settings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false
  };

  constructor() {
    if (localStorage.getItem('settings')) {
      this._settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  get settings() {
    return this._settings;
  }

  set settings(value: Settings) {
    this._settings = value;
    localStorage.setItem('settings', JSON.stringify(this._settings));
  }
}
