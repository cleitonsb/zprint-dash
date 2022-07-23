import { msg } from './../../../variables/msg';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from './../../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  titulo = 'Produtos';
  subTitulo = 'Cadastro';
  urlBreadcrumb = 'products';

  formEdit = false;

  product = new Product();

  constructor(
    private service: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private notify: NotificationService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe((params) => this.view(params.id));
  }

  view(id) {
    if (id) {
      this.service.get(id).subscribe((data: any) => {
        this.product = data;
      });
    } else {
      this.formEdit = true;
    }

    this.spinner.hide();
  }

  save() {
    if(this.valida()) {
      this.spinner.show();

      this.service.store(this.product).subscribe((response: any) => {
        if (response.status === 200) {
            this.saveSuccess(response.body.id);
        }
      });
    }
  }

  valida(){

    if(this.product.tipo == null ) {
      this.notify.error(msg.custom(msg.E006, 'Tipo'));
      return false;
    }
    
    if(this.product.tipo == 0) {
      if(this.product.ean == ''  || this.product.ean == null) {
        this.notify.error(msg.custom(msg.E006, 'Código EAN'));
        return false;
      }
    }

    return true;
  }

  saveSuccess(id: string) {
    this.notify.sucess(msg.S001);
    if (id) {
      this.router.navigate(['/product/' + id]);
    }

    this.spinner.hide();
  }


  delete() {
    this.spinner.show();
    this.service.delete(this.product.id).subscribe((response: any) => {
      this.notify.sucess(msg.S002);
      this.router.navigate(['/products']);
      this.spinner.hide();
    });
  }

  edit() {
    this.formEdit = true;
  }

}
