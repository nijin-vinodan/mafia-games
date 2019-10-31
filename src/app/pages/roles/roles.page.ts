import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { PlayerRole } from 'src/app/models/PlayerRole';


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
  playersCount: number;

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
    this.roles = this.firebaseService.getRolesList();
    this.getRolesConfiguration();
    if (window.history.state) {
      this.playersCount = window.history.state.playersCount;
      if (!this.playersCount) {
        // Navigate back to list as state [playersCount] is not available
        this.router.navigate(['list']);
      }
    }
  }


  /**
   * Get list of roles configurations available for the given playersCount from Firebase
   */
  async getRolesConfiguration() {
    const configList = await this.firebaseService.getConfigList();
    if ( configList ) {
      for (const configItem of configList) {
        if ( configItem.id === 'players_' + this.playersCount ) {
          this.roleConfigurations = configItem.players;
          break;
        }
      }
      this.mapRolesToConfiguration();
    }
  }

  /**
   * Map Roles to Configuration based on Player Count. This method will combine the roles configuration to all roles.
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
  assignRoles() {}


  /**
   * Choose Moderator selected roles and assign them based on count
   * @example A Game might contain many detectives. Provide names like Detective 1, Detective 2 etc.
   */
  processRoles(roles) {
    const playerRoles = Array<PlayerRole>();
    // Loop through all roles
    for (const role of roles) {
      if ( role.count > 0 ) {
        // Loop through count of role
        for ( let i = 1 ; i <= role.count ; i++ ) {
          const playerRole = new PlayerRole();
          playerRole.name = role.name;
          if (role.count > 1) {
            // Append Numbers for roles which is used multiple times
            playerRole.name =  `${playerRole.name} ${i}`;
          }
          playerRole.role = role.id;
          playerRoles.push(playerRole);
        }
      }
    }
    console.log(playerRoles);
    return playerRoles;
  }

  /**
   * Start Game
   */
  startGame() {
    console.log('Start Game', this.roles);
    this.processRoles(this.roles);
  }

  /**
   * Update role count. Moderator has flexibility to change the roles count.
   * @param count
   * @param roleId
   */
  updateRoleCount(count: number, roleId: string) {
    for ( let i = 0 ; i < this.roles.length ; i++ ) {
      if ( this.roles[i].id === roleId ) {
        this.roles[i].count = count;
      }
    }
  }
}
