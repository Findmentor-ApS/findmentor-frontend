import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { UnsavedChangesGuard } from 'src/app/guards/unsaved-changes.guard';
import { ProfileService } from 'src/app/services/profile.service';
import { SharedVariablesService } from 'src/app/services/shared-variables.service';
import { UserDataService } from 'src/app/services/user-data.service';

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

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private sharedService: SharedVariablesService,
    private profileService: ProfileService, private unsavedChanges: UnsavedChangesGuard<EditProfileComponent>,
    private userDataService: UserDataService) { }
  ngOnInit(): void {
    this.type = localStorage.getItem('type');
    this.user = this.userDataService.getCurrentUser();

    this.createForm();

    // Listen for the blur event on the 'cvr' form control
    this.formGroup.get('cvr').valueChanges.pipe(
      debounceTime(500),  // Delay by 500ms (can adjust as needed)
      distinctUntilChanged(),  // Only emit if value has changed
      switchMap(newValue => this.profileService.searchCompany(newValue))  // Call the searchCompany method
    )
    .subscribe(
      {
        next: (res) => {
          let companyName;
          if (res.hits && res.hits.hits && res.hits.hits.length > 0) {
              let company = res.hits.hits[0]._source.Vrvirksomhed;
              if (company.navne) {
                  for (let navn of company.navne) {
                      if (navn.periode.gyldigTil == null) {
                          companyName = navn.navn;
                          break;
                      }
                  }
              }
          }
          else {
              companyName = 'Ikke gyldigt CVR-nummer';
          }

          this.formGroup.get('company_name').setValue(companyName);
          console.log(this.formGroup.get('company_name').value);
        },
        error: (error) => {
          this.success = false;
          this.errorMessage = error.message
        }
      }
    );
  }

  private commonControls() {
    return {
      first_name: new FormControl(this.user.first_name, [Validators.required]),
      last_name: new FormControl(this.user.last_name, [Validators.required]),
      phone: new FormControl(this.user.phone, [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.minLength(8)]),
      email: new FormControl(this.user.email,[Validators.required, Validators.email]),
    };
  }
  
  private mentorControls() {
    return {
      ...this.commonControls(),
      // specific form controls for mentor
      street: new FormControl(this.user.street, [Validators.required]),
      street_no: new FormControl(this.user.street_no, [Validators.required]),
      street_floor: new FormControl(this.user.street_side),
      street_side: new FormControl(this.user.street_side),
      post_code: new FormControl(this.user.post_code, [Validators.required]),
      city: new FormControl(this.user.city, [Validators.required]),
      education: new FormControl(this.user.education, [Validators.required]),
      gender: new FormControl(this.user.gender, [Validators.required]),
      linkedin: new FormControl(this.user.linkedin),
      cvr: new FormControl(this.user.cvr, [Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
      company_name: new FormControl({value:this.user.company_name, disabled: true}, [Validators.required]),
      description: new FormControl(this.user.description,[Validators.required]),
    };
  }
  
  private communeControls() {
    return {
      ...this.commonControls(),
      // specific form controls for commune
      commune_name: new FormControl(this.user.commune_name, [Validators.required]),
      department: new FormControl(this.user.department, [Validators.required]),
      ean_nr: new FormControl(this.user.ean_nr, [Validators.required]),
    };
  }
  
  private userControls() {
    return {
      ...this.commonControls(),
      // specific form controls for user
      street: new FormControl(this.user.street, [Validators.required]),
      street_no: new FormControl(this.user.street_no, [Validators.required]),
      street_side: new FormControl(this.user.street_side, [Validators.required]),
      post_code: new FormControl(this.user.post_code, [Validators.required]),
      city: new FormControl(this.user.city, [Validators.required]),
      gender: new FormControl(this.user.gender, [Validators.required]),
    };
  }
  
  createForm() {
    let controls;
    switch(this.type) {
      case 'mentor':
        controls = this.mentorControls();
        break;
      case 'commune':
        controls = this.communeControls();
        break;
      case 'user':
        controls = this.userControls();
        break;
      default:
        throw new Error(`Invalid type: ${this.type}`);
    }
  
    this.formGroup = this.fb.group(controls);
  }


  updateProfile(){
    console.log(this.formGroup.get('company_name').value);
    if(this.formGroup.get('company_name').value == 'Ikke gyldigt CVR-nummer'){
      this.errorMessage = 'Ikke gyldigt CVR-nummer';
      this.success = false;
      return;
    }
    this.profileService.updateProfile(this.formGroup.getRawValue()).subscribe(
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
