import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ProfileService } from 'src/app/services/profile.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-image-profile',
  templateUrl: './image-profile.component.html',
  styleUrls: ['./image-profile.component.css']
})
export class ImageProfileComponent {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  errorMessage: string = '';
  is_loaded: boolean = false;
  success: boolean = false;
  profile_picture: any = '';

  constructor(private profileService: ProfileService,private route: ActivatedRoute, private userDataService: UserDataService) { }

  ngOnInit(): void {
    const user = this.userDataService.getCurrentUser();
    this.profile_picture = user.profile_picture;
  }
  

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.errorMessage = '';
    this.is_loaded = true;
  }
  cropperReady() {
  }
  loadImageFailed() {
    this.is_loaded = false;
    this.errorMessage = "Billedet kunne ikke indlæses. Prøv venligst gyldig billede type."
  }

  // call this method to save the image and call the service to save the image to the server
  saveImage() {
    if (!this.is_loaded) {
      this.errorMessage = 'Du skal vælge et billede først!';
      return;
    }
  
    const userData = {
      profile_picture: this.croppedImage
    };
  
    this.profileService.updateProfilePicture(userData).subscribe({
      next: (res) => {
        this.success = true;
        this.errorMessage = '';
        // update user data in the service
        const user = this.userDataService.getCurrentUser();
        user.profile_picture = this.croppedImage;
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
    });
  }
  
}
