import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {  MenuController } from '@ionic/angular';
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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  ionViewWillEnter(){
    this.menuController.enable(false);
  }

  /**
   * Method : initializeForm
   * Desc   : Initialize both JoinGameForm and CreateGameForm
   */
  initializeForm(){
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
  joinGame(){
    console.log("Joining Game", this.joinGameForm.valid, this.joinGameForm.get("userName").value, this.joinGameForm.get("gameName").value);
    
    // console.log(this.firebaseService.addGame());

    if(this.joinGameForm.valid){
      this.firebaseService.addNewPlayer({
        userName : this.joinGameForm.get("userName").value,
        gameName: this.joinGameForm.get("gameName").value
      });
      this.router.navigate(['home']);
    }else{
      console.log("Invalid Fields");
    }
  }

  /**
   * Method : createGame
   * Desc   : Create a name game with game id and password
   */
  async createGame(){

    console.log("Create Game");

    if(this.createGameForm.valid){
      let newGameObject : NewGameModel = {
        name : this.createGameForm.get("gameName").value,
        password: this.createGameForm.get("gamePassword").value
      };
      let createGameResponse = await this.firebaseService.addNewGame(newGameObject);

      if(createGameResponse){
        const navigationExtras: NavigationExtras = {
          state: {
            gameName : newGameObject.name
          }
        };
        this.router.navigate(['list'], navigationExtras);
      }else{

      }
      
    }else{
      console.log("Invalid Fields");
    }
    

  }
}
