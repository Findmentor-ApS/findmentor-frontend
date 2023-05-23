import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  @Input() mentors: any[] = [];
  

  totalItems: number = 0;
  private pageNumber: number = 1; // Start from page 1
  private pageSize: number = 10; // Items per page

  constructor(private mentorService: MentorService,@Inject('ASSET_PATH') public assetPath: string) {}

  onScroll() {
    this.pageNumber++; // Increment the page number
    this.loadMoreMentors();
  }
  

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.index &&
      changes.index.currentValue &&
      changes.index.currentValue !== changes.index.previousValue
    ) {
      this.pageNumber = changes.index.currentValue;
      this.loadMoreMentors();
    }
  }

  getExperienceName(id: number): string {
    const experience = experienceType.find(l => l.id == id);
    return experience ? experience.name : '';
  }

  loadMoreMentors() {
    this.mentorService
        .searchMentors(
          this.selectedMentorType,
          this.selectedLocationArr,
          this.selectedTypeForm,
          this.selectedLanguage,
          this.selectedGender,
          this.selectedContact,
          this.selectedTarget,
          this.pageNumber,
          this.pageSize
        )
        .subscribe((result) => {
          this.mentors = this.mentors.concat(result.result);
          this.totalItems = result.totalItems;
        });
  }
  
}