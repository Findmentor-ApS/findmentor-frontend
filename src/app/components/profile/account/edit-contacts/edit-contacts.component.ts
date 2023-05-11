import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { contactsType } from 'src/app/general/types';
import { ProfileService } from 'src/app/services/profile.service';
import { UserDataService } from 'src/app/services/user-data.service';


@Component({
  selector: 'app-edit-contacts',
  templateUrl: './edit-contacts.component.html',
  styleUrls: ['./edit-contacts.component.css']
})
export class EditContactsComponent {
  selectedTypeContact: number[] = [];
  success = false;
  errorMessage = '';
  contactsType = contactsType;

constructor(private route: ActivatedRoute, private profileService: ProfileService, private userDataService: UserDataService) { }

ngOnInit(): void {
  const user = this.userDataService.getCurrentUser();
  this.selectedTypeContact = user.contacts.map((con) => parseInt(con.contact_type));
}

updateContact() {
  if (!this.selectedTypeContact || this.selectedTypeContact.length === 0) {
    this.errorMessage = 'Du skal vælge mindst en kontakform';
    return;
  }
  
  const userData = {
    typeContacts: this.selectedTypeContact
  };

  this.profileService.updateProfileContacts(userData).subscribe(
    {
      next: (res) => {
        this.success = true;
        this.errorMessage = '';
        const user = this.userDataService.getCurrentUser();
        user.contacts =  this.selectedTypeContact.map((type) => {
          return { contact_type: type.toString() };
        });
        this.userDataService.setUser(user);
      },
      error: (err) => {
        this.success = false;
        let errorMessage = 'Der er opstået en fejl!';
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
          console.log(err.error.message);
        }
        this.errorMessage = errorMessage; // Update errorMessage here
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    }
  );
}

}
