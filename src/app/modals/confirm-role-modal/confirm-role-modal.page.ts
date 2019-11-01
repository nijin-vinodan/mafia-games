import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-role-modal',
  templateUrl: './confirm-role-modal.page.html',
  styleUrls: ['./confirm-role-modal.page.scss'],
})
export class ConfirmRoleModalPage implements OnInit {

  @Input() players;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    console.log(this.players);
  }

  dismiss(action) {
    this.modalController.dismiss(action);
  }
}
