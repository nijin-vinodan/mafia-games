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
   * Method : getLoggedInUser
   */
  async getLoggedInUser(){
    return await this.storage.get(AppConstants.LOCAL_STORAGE.LOGGED_IN_USER).then(val => {
      return val;
    });
  }

  /**
   * Method : getGameDetails
   * @param gameName 
   */
  async getGameDetails(){
    return await this.storage.get(AppConstants.LOCAL_STORAGE.GAME_DETAILS).then(val => {
      return val;
    });
  }

  /**
   * Method : addGameDetails
   * @param gameName 
   * @param password 
   */
  async addGameDetails(gameObj : NewGameModel){
    return await this.storage.set(AppConstants.LOCAL_STORAGE.GAME_DETAILS, gameObj).then(val => {
      return val;
    });
  }


  async removeLocalStorage(){
    await this.storage.remove(AppConstants.LOCAL_STORAGE.LOGGED_IN_USER);
    await this.storage.remove(AppConstants.LOCAL_STORAGE.GAME_DETAILS);
  }
}
