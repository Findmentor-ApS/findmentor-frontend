import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UnsavedChangesGuard } from 'src/app/guards/unsaved-changes.guard';
import { ProfileService } from 'src/app/services/profile.service';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';
import { UserDataService } from 'src/app/services/user-data.service';


@Component({
  selector: 'app-edit-approach',
  templateUrl: './edit-approach.component.html',
  styleUrls: ['./edit-approach.component.css']
})
export class EditApproachComponent {
  formGroup: FormGroup;
  user: any;
  success = false;
  errorMessage = '';
  type = '';

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private sharedService: SharedVariablesService,
    private profileService: ProfileService, private unsavedChanges: UnsavedChangesGuard<EditApproachComponent>,
    private userDataService: UserDataService) { }
  ngOnInit(): void {
    this.type = localStorage.getItem('type');
    this.user = this.userDataService.getCurrentUser();
    this.formGroup = this.fb.group({
      approach: new FormControl(this.user.approach, [Validators.required]),
    });  
  }

  updateApproach(){
    this.profileService.updateApproach(this.formGroup.value).subscribe(
      {
        next: (res) => {
          this.success = true;
          this.errorMessage = '';
          const user = this.userDataService.getCurrentUser();
          user.approach = res.approach;
          this.userDataService.setUser(user);
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
