import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';


/**
 * Page to display list of available roles for the game
 */
@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {
  /**
   * playersCount - List of active participants in the game. State variable from previous list page
   */
  playersCount: Number;
  /**
   * roles - List of available roles with their number in the game
   */
  roles;

  /**
   * Constructor
   * @param firebaseService
   * @param router
   * @param storage
   */
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private storage: Storage
  ) {
    this.firebaseService.listenForData();
  }

  /**
   * ngOnInit
   */
  ngOnInit() {

  }

  /**
   * Ion View Will Enter
   */
  ionViewWillEnter() {
    this.getAllRoles();
    if (window.history.state) {
      this.playersCount = window.history.state.playersCount;
      if (this.playersCount) {
        this.getRolesConfiguration();
      } else {
        // Navigate back to list as state [playersCount] is not available
        this.router.navigate(['list']);
      }
    }
  }


  /**
   * Get All Roles in the Game
   */
  getAllRoles() {
    this.firebaseService.rolesData.subscribe(roles => {
        this.roles = roles;
   });
  }

  /**
   * Get list of roles configurations available for the given playersCount from Firebase
   */
  getRolesConfiguration() {
    this.firebaseService.configData.subscribe(roles => {
      //  for(let i = 0 ; i < roles.length ; i++){
      //    if(roles[i].id === "players_" + this.playersCount){
      //     this.roles = roles[i].players;
      //     break;
      //    }
      //  }
    });
  }


  /**
   * Assign Roles to Players in Random Fashion Order
   */
  assignRoles() {

  }

  /**
   * Start Game
   */
  startGame() {
    console.log('Start Game');
  }
}
