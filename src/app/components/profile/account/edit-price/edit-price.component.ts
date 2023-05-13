import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UnsavedChangesGuard } from 'src/app/guards/unsaved-changes.guard';
import { ProfileService } from 'src/app/services/profile.service';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';
import { UserDataService } from 'src/app/services/user-data.service';


@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styleUrls: ['./edit-price.component.css']
})
export class EditPriceComponent {
  formGroup: FormGroup;
  user: any;
  success = false;
  errorMessage = '';
  type = '';

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private sharedService: SharedVariablesService,
    private profileService: ProfileService, private unsavedChanges: UnsavedChangesGuard<EditPriceComponent>,
    private userDataService: UserDataService) { }
  ngOnInit(): void {
    this.type = localStorage.getItem('type');
    this.user = this.userDataService.getCurrentUser();
    if(this.type == 'mentor') {
      this.formGroup = this.fb.group({
        price: new FormControl(this.user.price, [Validators.required]),
      });  
    }
  }

  updatePrice(){
    this.profileService.updatePrice(this.formGroup.value).subscribe(
      {
        next: (res) => {
          this.success = true;
          this.errorMessage = '';
          this.userDataService.setUser(res);
          console.log(res);
        },
        error: (error) => {
          this.success = false;
          this.errorMessage = error.message
        },
        complete: () => console.log('complete')
      }
    )
  }

  canDeactivate() {
    return this.unsavedChanges.canDeactivate(this);
  }

}
