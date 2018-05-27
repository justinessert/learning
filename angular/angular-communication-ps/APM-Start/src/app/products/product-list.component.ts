import { Component, OnInit, ViewChild } from '@angular/core';

import { IProduct } from './product';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductService } from './product.service';
import { ProductParameterService } from './product-parameter.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    private _listFilter: string;
    includeDetail: boolean = true;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;

    constructor(private productService: ProductService, private productParameterService: ProductParameterService) { }

    get listFilter(){
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      this.performFilter(value);
    }
    get showImage(): boolean {
      return this.productParameterService.showImage;
    }
    set showImage(value: boolean) {
      this.productParameterService.showImage = value;
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.filterComponent.listFilter = this.productParameterService.filterBy;
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    onValueChange(value: string): void {
      this.productParameterService.filterBy = value;
      this.performFilter(value);
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
