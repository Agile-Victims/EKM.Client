import { Component, OnInit } from '@angular/core';
import { ExamsService } from '../../../admin/services/exams.service';
import { Exam } from '../../../../shared/models/Exam';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-exams-page',
  templateUrl: './exams-page.component.html',
  styleUrls: ['./exams-page.component.css'],
  imports: [NgFor, RouterLink]
})
export class ExamsPageComponent implements OnInit {
  exams: Exam[] = [];

  constructor(private examsService: ExamsService) {}

  ngOnInit(): void {
    this.examsService.getExams().subscribe((data) => {
      this.exams = data;
    });
  }
}
