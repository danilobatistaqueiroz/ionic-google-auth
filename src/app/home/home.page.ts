import { Component } from '@angular/core';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user?:User|null;

  constructor() {
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }
  }

  async signIn() {
    this.user = await GoogleAuth.signIn();
    console.log('user: ', this.user);
  }

  async signOut() {
    await GoogleAuth.signOut();
    this.user = null;
  }

  async refresh() {
    const authCode = await GoogleAuth.refresh();
    console.log('refresh: ', authCode);
    // { accessToken: 'xxx', idToken: 'xxx }
  }

}
