import { Component, OnInit } from '@angular/core';
import { GithubService } from './../../services/github.service';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-commits-list',
  templateUrl: './commits-list.component.html',
  styleUrls: ['./commits-list.component.scss'],
})
export class CommitsListComponent implements OnInit {
  moment: any = moment;
  commitsList: Array<any> = [];
  accountInfo: Array<any> = [];
  showTable: boolean = false;
  showAccountInfo: boolean = false;
  showAccountInfoButton: boolean = false;
  showPullToRefresh: boolean = false;
  showInfo: boolean = false;
  pullToRefresh: boolean = true;
  catchError: string;

  constructor(private githubService: GithubService, public alertController: AlertController) { }

  ngOnInit() {
  }


  getAccountInfo() {
    this.showAccountInfo = true;
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

  getCommitsList() {
    this.showAccountInfoButton = true;
    this.pullToRefresh = false;
    this.githubService.getCommitsList().subscribe(
      (data:any) => {
        this.showTable = true;
        this.showPullToRefresh = true;
        this.commitsList = data;
        return this.commitsList;
      },
      (err) => {
      this.catchError = err.error.message;
      this.showPullToRefresh = false;
      this.showTable = false;
      this.presentAlert();
      })
  }

  doRefresh(event) {
    document.getElementsByTagName('ion-refresher')[0].style.display = "block";
    setTimeout(() => {
      event.target.complete();
      document.getElementsByTagName('ion-refresher')[0].style.display = "none";
      this.getCommitsList();
    }, 1000);
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
