import { Component } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Commit } from './../models/commit'

@Component({
  selector: 'app-data-manager',
  templateUrl: 'data-manager.page.html',
  styleUrls: ['data-manager.page.scss'],
})
export class DataManagerPage {
  commitsList: Array<any> = [];
  catchError: string;
  commitArray: Commit[] = [
    {id: 1,
    msg: 'added routes and data-manager page'},
    {id: 2,
    msg: 'Content scroll fixed'},
    {id: 3,
    msg: 'fix layout and look and feel'},
    {id: 4,
    msg: 'initial commit, ionic installation, components creation and look and feel design'}
  ]; 

  selectedCommit: Commit = new Commit();
  constructor(
    private menu: MenuController,
    public alertController: AlertController) {}

  ngOnInit() {
  }

  //menu control
  openEnd() {  
    this.menu.close();
    }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

    //swipe icon controls actions
  delete(commit) {
    this.presentAlertConfirm(commit);
  }

  async presentAlertConfirm(commit) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Dear user',
      message: '<strong>Are you sure to delete this item?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Continue',
          handler: () => {
            this.commitArray = this.commitArray.filter( x => x != commit);
            this.selectedCommit = new Commit();
          }
        }
      ]
    });
    await alert.present();
  }

  addOrEdit() {
    if(this.selectedCommit.id === 0) {
      this.selectedCommit.id = this.commitArray.length + 1;
      this.commitArray.push(this.selectedCommit);
    }
    this.selectedCommit = new Commit();
  }

  openForEdit(commit) {
    this.selectedCommit = commit;
  }
}
