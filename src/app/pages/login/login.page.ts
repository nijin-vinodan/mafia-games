import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { AppConstants } from '../../constants/app-constants';
import { NewGameModel } from 'src/app/models/NewGameModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  joinGameForm: FormGroup;
  createGameForm: FormGroup;
  FORM_REGEX_VALIDATOR = AppConstants.FORM_REGEX_VALIDATOR;

  constructor(
    private menuController: MenuController,
    private router: Router,
    private firebaseService: FirebaseService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // Checked Logged In User
    this.initializeForm();
    this.initializeLogin();
  }

  async initializeLogin() {
    const loggedInUser = await this.localStorageService.getLoggedInUser();
    const gameDetails = await this.localStorageService.getGameDetails();
    if (loggedInUser) {
      console.log('Game Player');
      this.router.navigate(['home']);
    } else if (gameDetails) {
      console.log('Game Moderator');
      this.router.navigate(['list']);
    } else {
      console.log('No active Logins');
    }
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  /**
   * Method : initializeForm
   * Desc   : Initialize both JoinGameForm and CreateGameForm
   */
  initializeForm() {
    this.joinGameForm = this.formBuilder.group(
      {
        userName : [
          '', [Validators.required, Validators.pattern(this.FORM_REGEX_VALIDATOR.ALPHA_NUMERIC_DASH_NO_SPACE)]
        ],
        gameName : [
          '', [Validators.required, Validators.pattern(this.FORM_REGEX_VALIDATOR.ALPHA_NUMERIC_DASH_NO_SPACE)]
        ]
      }
    );

    this.createGameForm = this.formBuilder.group(
      {
        gameName : [
          '', [Validators.required, Validators.pattern(this.FORM_REGEX_VALIDATOR.ALPHA_NUMERIC_DASH_NO_SPACE)]
        ],
        gamePassword : [
          '', [Validators.required, Validators.pattern(this.FORM_REGEX_VALIDATOR.ALPHA_NUMERIC_DASH_NO_SPACE)]
        ]
      }
    );
  }

  /**
   * Method : joinGame
   * Desc   : Join a existing game with user name and game id
   */
  async joinGame() {
    const newPlayerObj = {
      userName : this.joinGameForm.get('userName').value.toLowerCase(),
      gameName: this.joinGameForm.get('gameName').value.toLowerCase()
    };

    if (this.joinGameForm.valid) {
      const newPlayerResponse: any = await this.firebaseService.addNewPlayer(newPlayerObj);
      console.log( newPlayerResponse );
      if ( newPlayerResponse ) {
        await this.localStorageService.addPlayer({
          ...newPlayerObj,
          id : newPlayerResponse.playerId,
        });
        this.router.navigate(['home']);
      }
    } else {
      console.log('Invalid Fields');
    }
  }

  /**
   * Method : createGame
   * Desc   : Create a name game with game id and password
   */
  async createGame() {
    if (this.createGameForm.valid) {
      const newGameObject: NewGameModel = {
        name : this.createGameForm.get('gameName').value.toLowerCase(),
        password: this.createGameForm.get('gamePassword').value
      };

      const createGameResponse = await this.firebaseService.addNewGame(newGameObject);

      if (createGameResponse) {
        // Add To LS
        await this.localStorageService.addGameDetails(newGameObject);
        const navigationExtras = {
          state : {
            gameName : newGameObject.name
          }
        };
        this.router.navigate(['list'], navigationExtras);
      } else {
        console.log('Error in creating game');
      }
    } else {
      console.log('Invalid Fields');
    }
  }
}
