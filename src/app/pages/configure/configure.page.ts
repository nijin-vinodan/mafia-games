import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { Data } from '../../data/data';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.page.html',
  styleUrls: ['./configure.page.scss'],
})
export class ConfigurePage implements OnInit {

  configurations = Data.ROLE_CONFIGURATIONS;

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
  }

  updateConfigurations() {
    for ( const config of this.configurations ) {
      this.firebaseService.addNewConfig(config);
    }
  }
}
