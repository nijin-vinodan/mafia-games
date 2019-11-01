import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { ShuffleService } from '../../services/shuffle/shuffle.service';
import { Router, NavigationExtras } from '@angular/router';
import { PlayerRole } from 'src/app/models/PlayerRole';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


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

  players;

  counter = {
    goodRoles: 0,
    badRoles: 0
  };

  roleConfigurations: any = [];

  /**
   * roles - List of available roles with their number in the game
   */
  roles: any = [];

  loader;

  /**
   * Constructor
   * @param firebaseService
   * @param router
   */
  constructor(
    private firebaseService: FirebaseService,
    private localStorageService: LocalStorageService,
    private loadingController: LoadingController,
    private router: Router,
    private shuffleService: ShuffleService,
    private toastController: ToastController
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
    this.initialize();
  }


  /**
   * Initialize. Moving this away from ionViewWillEnter as it has await/async
   */
  async initialize() {
    if (window.history.state) {
      this.players = window.history.state.players;
      if ( this.players && this.players.length > 0 ) {
        const roles = await this.localStorageService.getGameRoleConfigurations();
        if (roles && roles.length > 0) {
          this.roles = roles;
        } else {
          this.roles = this.firebaseService.getRolesList();
          this.getRolesConfiguration();
        }
        this.countAssignedRoles();
      } else {
        // Navigate back to list as state [playersCount] is not available
        this.router.navigate(['list']);
      }
    }
  }

  /**
   * Show the loader
   * @param message
   */
  async showLoader (message: string) {
    this.loader = await this.loadingController.create({
      message: message
    });
    await this.loader.present();
  }

  /**
   * Hide the Loader
   */
  async hideLoader () {
    await this.loader.dismiss();
  }

  /**
   * Get list of roles configurations available for the given playersCount from Firebase
   */
  async getRolesConfiguration() {
    this.showLoader('Loading Roles');
    const configList = await this.firebaseService.getConfigList();
    this.hideLoader();
    if ( configList ) {
      for (const configItem of configList) {
        if ( configItem.id === 'players_' + this.players.length ) {
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
  async mapRolesToConfiguration() {
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

      // Add Roles Config to LS
      await this.localStorageService.addGameRoleConfigurations(this.roles);

      // To Do : Sort By Good/Bad Roles
      console.log(this.roles);
    }
  }


  /**
   * Count the number of roles which are assigned
   */
  countAssignedRoles () {
    this.counter = {
      goodRoles: 0,
      badRoles: 0
    };
    for ( const role of this.roles ) {
      if ( role.isGoodPerson ) {
        this.counter.goodRoles = this.counter.goodRoles + role.count;
      } else {
        this.counter.badRoles = this.counter.badRoles + role.count;
      }
    }
  }

  /**
   * Assign Roles to Players in Random Fashion Order
   */
  async assignRoles() {
    if ( (this.counter.goodRoles + this.counter.badRoles) === this.players.length ) {
      // Shuffle Roles & Players
      await this.showLoader('Assigning Roles');
      const roles = await this.shuffleService.shuffle(this.processRoles(this.roles));
      const players = await this.shuffleService.shuffle(this.players);
      this.hideLoader();
      // Assign Roles to Players
      for ( let i = 0 ; i < players.length ; i++ ) {
        players[i].role = roles[i].role;
      }
      console.log(players);
    } else {
      const toast = await this.toastController.create({
        message: 'Selected Roles does not match the number of players',
        duration: 3000,
        animated: true,
        showCloseButton: true
      });
      toast.present();
    }
  }


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
          if (role.count > 1 && role.id !== 'mafia') {
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

    // Update in LS
    this.localStorageService.addGameRoleConfigurations(this.roles);
    this.countAssignedRoles();
  }
}
