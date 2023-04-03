import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { experienceType } from 'src/app/general/types';

@Component({
  selector: 'app-mentor-detail',
  templateUrl: './mentor-detail.component.html',
  styleUrls: ['./mentor-detail.component.css']
})
export class MentorDetailComponent implements OnInit {

  mentor: any;
  experienceTypeMap: {[key: number]: string} = {};

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    experienceType.forEach(type => {
      this.experienceTypeMap[type.id] = type.name;
    });

    this.route.data.subscribe((data: { mentor: any }) => {
      this.mentor = data.mentor;
      this.mentor.experiences = data.mentor.experiences.map((exp) => parseInt(exp.experience_type));
    });
    console.log(this.mentor);
  }

}
