import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {

  playersCount : Number;
  roles;

  constructor(
    private firebaseService: FirebaseService,
    private storage: Storage
  ) { 
    this.firebaseService.listenForData();
  }

  ngOnInit(){
    if (window.history.state) {
      this.playersCount = window.history.state.playersCount;
      console.log(this.playersCount);
      this.getRolesConfiguration();
    }
  }

  getRolesConfiguration(){
    console.log("get Roles");
    this.firebaseService.configData.subscribe(roles => {
       console.log(roles);
       for(let i = 0 ; i < roles.length ; i++){
         console.log(roles[i].id, "players_" + this.playersCount, roles[i].id === "players_" + this.playersCount);
         if(roles[i].id === "players_" + this.playersCount){
          this.roles = roles[i].players;
          console.log(this.roles);
          break;
         }
       }
    })
  }

  startGame(){
    console.log("Start Game");
  }

}
