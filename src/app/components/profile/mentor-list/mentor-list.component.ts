import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { experienceType } from 'src/app/general/types';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-mentor-list',
  templateUrl: './mentor-list.component.html',
  styleUrls: ['./mentor-list.component.css'],
})
export class MentorListComponent implements OnChanges {
  @Input() index!: number;
  @Input() selectedMentorType: number = 0;
  @Input() selectedLocationArr: number[] = [];
  @Input() selectedGender: number[] = [];
  @Input() selectedTypeForm: number[] = [];
  @Input() selectedContact: number[] = [];
  @Input() selectedLanguage: number[] = [];
  @Input() selectedTarget: number[] = [];
  

  mentors: any[] = [];
  totalItems: number = 0;

  constructor(private mentorService: MentorService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.index &&
      changes.index.currentValue &&
      changes.index.currentValue !== changes.index.previousValue
    ) {
      this.mentorService
        .searchMentors(
          this.selectedMentorType,
          this.selectedLocationArr,
          this.selectedTypeForm,
          this.selectedLanguage,
          this.selectedGender,
          this.selectedContact,
          this.selectedTarget,
          this.index,
          10
        )
        .subscribe((result) => {
          this.mentors = result.result;
          this.totalItems = result.totalItems;
        });
    }
  }

  getExperienceName(id: number): string {
    const experience = experienceType.find(l => l.id == id);
    return experience ? experience.name : '';
  }
}