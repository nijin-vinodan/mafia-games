import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import { Game } from 'src/app/models/Game';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  game: Game;
  players: Array<any>;

  constructor(
    private menuController: MenuController,
    private router: Router,
    private firebaseService: FirebaseService,
    private localStorageService: LocalStorageService
  ) {
    this.game = {};
  }

  ionViewWillEnter() {
    this.menuController.enable(true);
  }

  ngOnInit() {
    this.initializePage();
  }

  /**
   * Method : initializePage
   */
  async initializePage() {
    const gameDetails = await this.localStorageService.getGameDetails();
    if (gameDetails) {
      this.game.name = gameDetails.name;
      this.firebaseService.getPlayersForGame(this.game.name);
      this.getPlayers();
    } else {
      // Navigate to Login
    }
  }

  /**
   * Method : getPlayers
   * Desc   : Subscribe to players who are joining the game
   */
  getPlayers() {
    // Subscribe for Game Players
    this.firebaseService.playersData.subscribe(playersList => {
      this.players = playersList;
    });
  }

  /**
   * Method : assignRoles
   * Role   : Create Game Functionality
   * Desc   : To assign roles to the players.
   */
  assignRoles() {
    // To Do : Change playersCount to Dynamic players
    const navigationExtras: NavigationExtras = {
      state: {
        playersCount : 5
      }
    };
    this.router.navigate(['roles'], navigationExtras);
  }
}
