import { msg } from './../../../variables/msg';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from './../../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from './../../../services/location.service';
import { PersonService } from './../../../services/person.service';
import { Person } from './../../../models/person';
import { Component, OnInit } from '@angular/core';
import { Endereco } from 'src/app/models/endereco';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent implements OnInit {

  titulo = 'Pessoas';
  subTitulo = 'Cadastro';
  urlBreadcrumb = 'people';

  estates: any;
  cities: any;
  avatar: any;
  formEdit = false;

  person = new Person();

  constructor(
    private service: PersonService,
    private location: LocationService,
    private route: ActivatedRoute,
    private router: Router,
    private notify: NotificationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe((params) => this.view(params.id));
    this.location.getEstates().subscribe((data: any) => {
      this.estates = data;
      this.spinner.hide();
    });
  }

  view(id) {
    if (id) {
      this.service.get(id).subscribe((data: any) => {
        this.person = data;

        if (data.enderecos.length > 0) {
          this.getCities(this.person.enderecos[0].cidade.estado.id);
        } else {
          this.person.enderecos[0] = new Endereco();
        }
      });
    } else {
      this.person.enderecos[0] = new Endereco();
      this.formEdit = true;
    }
  }

  getCities(estate_id) {
    this.spinner.show();
    this.location.getCities(estate_id).subscribe((data: any) => {
      this.cities = data;
    });

    this.spinner.hide();
  }

  save() {

    console.log(this.person);


    this.spinner.show();

    this.service.store(this.person).subscribe((response: any) => {
      if (response.status === 200) {

        this.notify.sucess(msg.S001);
        this.formEdit = false;
        this.router.navigate(['/person/' + response.body.id + '/edit']);

        this.spinner.hide();
      }
    });
  }

  delete() {
    this.spinner.show();
    this.service.delete(this.person.id).subscribe((response: any) => {
      this.notify.sucess(msg.S002);
      this.router.navigate(['/users']);
      this.spinner.hide();
    });
  }

  edit() {
    this.formEdit = true;
  }

}
