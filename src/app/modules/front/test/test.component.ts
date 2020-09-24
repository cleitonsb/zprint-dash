import { DataService, ProductInterface } from './dataService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  people: any;
  peopleLoading = false;

  constructor(
      private dataService: DataService) {
  }

  ngOnInit() {

  }

  loadPeople() {
      this.peopleLoading = true;

      this.dataService.getByParam('a').subscribe(x => {
          this.people = x;
          this.peopleLoading = false;
      });
  }
}
