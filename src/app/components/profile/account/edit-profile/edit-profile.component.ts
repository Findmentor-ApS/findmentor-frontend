import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UnsavedChangesGuard } from 'src/app/guards/unsaved-changes.guard';
import { ProfileService } from 'src/app/services/profile.service';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  formGroup: FormGroup;
  user: any;
  success = false;
  errorMessage = '';
  type = '';
  is_avaliable: boolean;

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private sharedService: SharedVariablesService,
    private profileService: ProfileService, private unsavedChanges: UnsavedChangesGuard<EditProfileComponent>) { }
  ngOnInit(): void {
    this.type = localStorage.getItem('type');
    this.route.data.subscribe((data: { user: any }) => {
      this.user = data.user;
      this.sharedService.isAvailable$.next(!!parseInt(this.user.is_avaliable));
    });
    this.sharedService.isAvailable$.subscribe((isAvailable) => {
      this.is_avaliable = isAvailable;
      if(this.type == 'mentor') {
        this.formGroup = this.fb.group({
          first_name: new FormControl(this.user.first_name, [Validators.required]),
          last_name: new FormControl(this.user.last_name, [Validators.required]),
          street: new FormControl(this.user.street, [Validators.required]),
          street_no: new FormControl(this.user.street_no, [Validators.required]),
          street_floor: new FormControl(this.user.street_side),
          street_side: new FormControl(this.user.street_side),
          post_code: new FormControl(this.user.post_code, [Validators.required]),
          city: new FormControl(this.user.city, [Validators.required]),
          education: new FormControl(this.user.education, [Validators.required]),
          gender: new FormControl(this.user.gender, [Validators.required]),
          phone: new FormControl(this.user.phone, [Validators.required,Validators.pattern('[- +()0-9]+'),Validators.minLength(8)]),
          email: new FormControl(this.user.email,[Validators.required, Validators.email]),
          linkedin: new FormControl(this.user.linkedin),
          description: new FormControl(this.user.description,[Validators.required]),
          is_avaliable: new FormControl(this.is_avaliable, []),
        });  
      }
      if(this.type == 'commune') {
        this.formGroup = this.fb.group({
          commune_name: new FormControl(this.user.commune_name, [Validators.required]),
          first_name: new FormControl(this.user.first_name, [Validators.required]),
          last_name: new FormControl(this.user.last_name, [Validators.required]),
          phone: new FormControl(this.user.phone, [Validators.required,Validators.pattern('[- +()0-9]+'),Validators.minLength(8)]),
          email: new FormControl(this.user.email,[Validators.required, Validators.email]),
          department: new FormControl(this.user.department, [Validators.required]),
          ean_nr: new FormControl(this.user.ean_nr, [Validators.required]),
        });
      }
    });

  }
updateProfile(){
    this.profileService.updateProfile(this.formGroup.value).subscribe(
      {
        next: (res) => {
          this.success = true;
          this.errorMessage = '';
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
