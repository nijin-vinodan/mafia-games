import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import { Game } from 'src/app/models/Game';
import { FirebaseService } from '../../services/firebase.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  game: Game;
  players : Array<any>;

  constructor(
    private menuController: MenuController,
    private router: Router,
    private firebaseService: FirebaseService
  ) {
    this.players = [
      { name : "Nijin", role : "Mafia"},
      { name : "Arthi", role : "Detective"}
    ];
    this.game = {};
  }

  ionViewWillEnter(){
    this.menuController.enable(true);
  }

  ngOnInit(){
    if (window.history.state) {
      this.game.name = window.history.state.gameName;
      this.firebaseService.getPlayersForGame(this.game.name);
      this.getPlayers();
    }
  }

  getPlayers(){
    // Subscribe for Game Players
    this.firebaseService.playersData.subscribe(playersList => {
      this.players = playersList;
    })
  }

  assignRoles(){
    const navigationExtras: NavigationExtras = {
      state: {
        playersCount : 4
      }
    };
    this.router.navigate(['roles'], navigationExtras);
  }
}
