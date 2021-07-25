import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment'
import { GithubService } from '../services/github.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  user: string;
  repo: string;
  accountInfo: Array<any> = [];
  catchError: string;

  constructor(private githubService: GithubService, public alertController: AlertController) { }

  ngOnInit() {
    this.user = environment.user;
    this.repo = environment.repo;
    this.githubService.getAccountInfo().subscribe(
      (data:any) => {
        this.accountInfo = data;
        console.log(this.accountInfo)
        return this.accountInfo;
      },
      (err) => {
      this.catchError = err.error.message;
      this.presentAlert();
      })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Dear user',
      subHeader: 'An error has occurred',
      message: `Repo ${this.catchError}`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
