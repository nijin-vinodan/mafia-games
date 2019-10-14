import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { NewGameModel } from '../models/NewGameModel';
import { FirebaseServiceHelper } from '../service-helpers/firebaseServiceHelper';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  private gameCollection : AngularFirestoreCollection;
  private configCollection: AngularFirestoreCollection;

  gameData : Observable<any>;
  configData: Observable<any>;

  /**
   * Stores subscribed value of gameData.
   */
  gameList : Array<any>;

  constructor(
    db: AngularFirestore, 
    private firebaseServiceHelper : FirebaseServiceHelper
  ) { 
    this.gameCollection = db.collection('game');
    this.configCollection = db.collection('game-config');

    // Listen for Data Changes in Firebase
    this.listenForData();
  }

  listenForData(){
    this.gameData = this.gameCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.configData = this.gameCollection.snapshotChanges().pipe(
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

  subscribeForData(){
    this.gameData.subscribe(gameList => {
      this.gameList = gameList;
    })
  }

  getGame(){
    return this.gameList;  
  }

  /**
   * Method : addNewGame
   * @param gameDetails 
   */
  async addNewGame(gameDetails : NewGameModel){
      // Check whether game name already exists
      let doesGameExist = this.firebaseServiceHelper.checkGameExists(this.gameList, gameDetails.name);
      if(!doesGameExist){
        let result = await this.gameCollection.doc(gameDetails.name).set({
          password : gameDetails.password,
          status   : true
        });
        console.log(result);
        return true;
      }else{
        console.log("Game Name already exists");
        return false;
      }
      
  }

  /**
   * Method : addNewPlayer
   * @param userDetails 
   */
  addNewPlayer(userDetails){
    return this.gameCollection.doc(userDetails.gameName).collection("players").add({
      name : userDetails.userName,
      role : "not-assigned"
    });
  }

  getPlayers(game: String){
    return this.gameData;
  }
}
