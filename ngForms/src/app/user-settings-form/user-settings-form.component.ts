import { Component, OnInit } from '@angular/core';
import { UserSettings  } from '../data/user-settings'
import { NgForm } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {
  originalUserSettings: UserSettings = {
    name: null,
    emailOffers : null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null
  }


  userSettings: UserSettings = { ...this.originalUserSettings }
  postError = false
  postErrorMessage = ''
  subscriptionTypes: Observable<string[]>;
  constructor(private dataService:DataService) {  }

  ngOnInit() {
    this.dataService.getSubscriptionTypes()
  }

 singleModel = 'on'
  onHttpError(errorResponse: any): void {
    console.log('error: ', errorResponse)
    this.postError = true
    this.postErrorMessage = errorResponse.error.errorMessage
  }

  onSubmit(form: NgForm) {
    console.log('in onSubmit', form.valid)
    if (form.valid) {
      this.dataService.postSettingForm(this.userSettings).subscribe(
        result => console.log('success: ', result),
        error => this.onHttpError(error)
      )
    } else {
      this.postError = true
      this.postErrorMessage = "please fix the above errors"
    }

}



}
