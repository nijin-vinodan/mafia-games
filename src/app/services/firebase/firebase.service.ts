import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewGameModel } from '../../models/NewGameModel';
import { FirebaseServiceHelper } from '../../service-helpers/firebaseServiceHelper';
import { AppConstants } from 'src/app/constants/app-constants';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  private gameCollection: AngularFirestoreCollection;
  private configCollection: AngularFirestoreCollection;
  private rolesCollection: AngularFirestoreCollection;

  gameData: Observable<any>;
  configData: Observable<any>;
  playersData: Observable<any>;
  rolesData: Observable<any>;

  /**
   * Stores subscribed values
   */
  gameList: Array<any>;
  configList: Array<any>;
  rolesList: Array<any>;

  constructor(
    db: AngularFirestore,
    private firebaseServiceHelper: FirebaseServiceHelper
  ) {
    console.log('Service Started');
    this.gameCollection = db.collection('game');
    this.configCollection = db.collection('game-config');
    this.rolesCollection = db.collection('roles');

    // Listen for Data Changes in Firebase
    this.listenForData();
  }

  getGameList() {
    return this.gameList;
  }

  getConfigList() {
    return this.configList;
  }

  getRolesList() {
    return this.rolesList;
  }

  listenForData() {
    this.gameData = this.gameCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.configData = this.configCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.rolesData = this.rolesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.subscribeForData();
  }

  /**
   * Method: subscribeForData
   */
  subscribeForData() {
    this.gameData.subscribe(gameList => {
      this.gameList = gameList;
    });

    this.configData.subscribe(configList => {
      this.configList = configList;
    });

    this.rolesData.subscribe(rolesList => {
      this.rolesList = rolesList;
    });
  }


  /**
   * Method : getPlayersForAGame
   * @param gameName
   */
  getPlayersForGame(gameName) {
    this.playersData = this.gameCollection.doc(gameName).collection('players').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  /**
   * Method : addNewGame
   * @param gameDetails
   */
  async addNewGame(gameDetails: NewGameModel) {
      // Check whether game name already exists
      const doesGameExist = this.firebaseServiceHelper.checkGameExists(this.gameList, gameDetails.name);
      if (!doesGameExist) {
        const result = await this.gameCollection.doc(gameDetails.name).set({
          password : gameDetails.password,
          status   : true
        });
        console.log(result);
        return true;
      } else {
        console.log('Game Name already exists');
        return false;
      }
  }

  /**
   * Method : addNewPlayer
   * @param userDetails
   */
  addNewPlayer(userDetails) {
    return this.gameCollection.doc(userDetails.gameName).collection('players').add({
      name : userDetails.userName,
      role : AppConstants.ROLES.NOT_ASSIGNED
    });
  }

  updatePlayersWithRoles(gameName, players) {
    for ( const player of players ) {
      this.gameCollection.doc(gameName).collection('players').doc(player.id).set({
        role : player.role,
        name : player.name
      });
    }
  }

  /**
   *
   * @param configuration
   */
  addNewConfig(configuration) {
    return this.configCollection.doc(configuration.name).set({
      players : configuration.players
    });
  }
}
