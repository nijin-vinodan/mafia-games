import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppConstants } from '../../constants/app-constants';
import { NewGameModel } from 'src/app/models/NewGameModel';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private storage: Storage
  ) { }

  /**
   * Get Logged In User Details from Local Storage
   */
  async getLoggedInUser() {
    return await this.storage.get(AppConstants.LOCAL_STORAGE.LOGGED_IN_USER).then(val => {
      return val;
    });
  }

  /**
   * Get Game Details From Local Storage
   */
  async getGameDetails() {
    return await this.storage.get(AppConstants.LOCAL_STORAGE.GAME_DETAILS).then(val => {
      return val;
    });
  }

  /**
   * Add Game Details to Local Storage
   * @param gameName
   * @param password
   */
  async addGameDetails(gameObj: NewGameModel) {
    return await this.storage.set(AppConstants.LOCAL_STORAGE.GAME_DETAILS, gameObj).then(val => {
      return val;
    });
  }

  /**
   * Get Game Role Configurations From Local Storage
   */
  async getGameRoleConfigurations() {
    return await this.storage.get(AppConstants.LOCAL_STORAGE.GAME_ROLE_CONFIGURATIONS).then(val => {
      return val;
    });
  }

  /**
   * Save Game Role Configurations to Local Storage
   * @param roleConfigObj
   */
  async addGameRoleConfigurations(roleConfigObj) {
    return await this.storage.set(AppConstants.LOCAL_STORAGE.GAME_ROLE_CONFIGURATIONS, roleConfigObj).then(val => {
      return val;
    });
  }

  /**
   * Clear Local Storage
   */
  async removeLocalStorage() {
    await this.storage.remove(AppConstants.LOCAL_STORAGE.LOGGED_IN_USER);
    await this.storage.remove(AppConstants.LOCAL_STORAGE.GAME_DETAILS);
  }
}
