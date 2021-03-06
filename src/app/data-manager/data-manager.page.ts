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
    msg: 'Added imgs captures for README.md'},
    {id: 2,
    msg: 'Added README.md'},
    {id: 3,
    msg: 'Commit model creation, added menu, fix dataManager page'},
    {id: 4,
    msg: 'added routes and data-manager page'},
    {id: 5,
    msg: 'Content scroll fixed'},
    {id: 6,
    msg: 'fix layout and look and feel'},
    {id: 7,
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
    if(this.selectedCommit.msg === undefined) {
      this.presentAlert();
      return;
    }
    if(this.selectedCommit.id === 0) {
      this.selectedCommit.id = this.commitArray.length + 1;
      this.commitArray.push(this.selectedCommit);
    }
    this.selectedCommit = new Commit();
  }

  openForEdit(commit) {
    this.selectedCommit = commit;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Dear user',
      message: `<strong>Please insert a commit message</strong>`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
