import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  currentPage : number;
  pages: any;
  prev: any;
  next : any;

  @Output()
  clickPage: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  setCurrentPage(page) {
    if(page == null) return;
    this.clickPage.emit(page);
  }

  /**
   * @param meta: {
   *   current_page: number,
   *   per_page: number,
   *   last_page: number
   * }
   */
  getPaginator(meta) {
    let arr = [];
    let qtPerPages = parseInt(meta.total) / parseInt(meta.per_page);
    qtPerPages = Math.trunc(qtPerPages);

    if(qtPerPages == 1) this.pages = null;
    if(qtPerPages > 5) qtPerPages = 5;

    if(meta.current_page == 1){
      for (let i = 1; i <= qtPerPages; i++) {
        arr.push(i);
      }

      this.pages = arr;
      this.prev = null;
      this.next = 2;
    }else if(meta.current_page == meta.last_page){
      for (let i = (meta.last_page - (qtPerPages - 1)); i <= meta.last_page; i++) {
        arr.push(i);
      }

      this.pages = arr;
      this.prev = meta.current_page - 1;
      this.next = null;
    }else{
      let divPages = Math.trunc(qtPerPages/2);

      console.log(meta.current_page - divPages);

      if(meta.current_page - divPages <= 0) {
        for (let i = 1; i <= (qtPerPages); i++) {
          arr.push(i);
        }
      }else if(meta.last_page > meta.current_page+divPages) {
        for (let i = (meta.current_page - divPages); i <= (meta.current_page + divPages); i++) {
          arr.push(i);
        }
      }else{
        for (let i = (meta.last_page - (qtPerPages - 1)); i <= (meta.last_page); i++) {
          arr.push(i);
        }
      }

      this.pages = arr;
      this.prev = meta.current_page - 1;
      this.next = meta.current_page + 1;
    }

    this.currentPage = meta.current_page;
  }

}
