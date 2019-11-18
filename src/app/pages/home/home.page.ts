import { Component } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { ScratchCard, SCRATCH_TYPE } from 'scratchcard-js'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  page = 1;
  user = {
    userName : '',
    gameName : '',
    id : '',
    role : ''
  };

  scratchCard: any;

  constructor(
    private menuController: MenuController,
    private localStorageService: LocalStorageService,
    private firebaseService: FirebaseService
  ) {}

  ionViewWillEnter() {
    this.menuController.enable(true);
    this.initialize();
  }

  async initialize() {
    this.user = await this.localStorageService.getLoggedInUser();
    console.log(this.user);
    if (this.user) {
      console.log(1);
      this.firebaseService.getPlayersForGame(this.user.gameName);
      this.getPlayers();
      this.createNewScratchCard();
    } else {
      console.log(2);
      this.page = 0;
    }
  }

  /**
   * Method : getPlayers
   * Desc   : Subscribe to players who are joining the game
   */
  getPlayers() {
    // Subscribe for Game Players
    this.firebaseService.playersData.subscribe(playersList => {
      for ( let i = 0 ; i < playersList.length ; i++) {
        if (playersList[i].playerId === this.user.id) {
          this.user.role = playersList[i].role;
        }
      }
    });
  }

  createNewScratchCard() {
    this.scratchCard = new ScratchCard('#js--sc--container', {
      scratchType: SCRATCH_TYPE.CIRCLE,
      containerWidth: 300,
      containerHeight: 300,
      imageForwardSrc: './assets/images/scratchcard-assigned.png',
      htmlBackground: '<div></div>',
      clearZoneRadius: 40,
      nPoints: 30,
      pointSize: 4,
      callback: () => {}
    });
    this.scratchCard.init();
  }
}
