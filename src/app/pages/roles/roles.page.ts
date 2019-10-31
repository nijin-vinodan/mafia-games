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

  roleConfigurations: any = [];

  /**
   * roles - List of available roles with their number in the game
   */
  roles: any = [];

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
      if (!this.playersCount) {
        // Navigate back to list as state [playersCount] is not available
        this.router.navigate(['list']);
      }
    }
  }


  /**
   * Get All Roles in the Game
   */
  getAllRoles() {
    this.getRolesConfiguration();
    this.firebaseService.rolesData.subscribe(roles => {
      this.roles = roles;
      this.mapRolesToConfiguration();
    });
  }

  /**
   * Get list of roles configurations available for the given playersCount from Firebase
   */
  getRolesConfiguration() {
    this.firebaseService.configData.subscribe(configValues => {
      for (let i = 0; i < configValues.length; i++) {
        if (configValues[i].id === 'players_' + this.playersCount) {
          this.roleConfigurations = configValues[i].players;
          break;
        }
      }
      console.log(this.roleConfigurations);
      this.mapRolesToConfiguration();
    });
  }

  /**
   * Map Roles to Configuration based on Player Count
   */
  mapRolesToConfiguration() {
    const _this = this;
    if (this.roles.length > 0 && this.roleConfigurations.length > 0) {
      for (let i = 0; i < this.roles.length; i++) {
        const config = this.roleConfigurations.filter(configuration => {
          return configuration.role === _this.roles[i].id;
        });
        if (config.length > 0) {
          this.roles[i].count = config[0].count;
        } else {
          this.roles[i].count = 0;
        }
      }
      console.log(this.roles);
    }
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

  /**
   * Update role count. Moderator has flexibility to change the roles count.
   * @param count
   * @param code
   */
  updateRoleCount(count: number, code: string) {

  }
}
