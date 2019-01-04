import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BaseMenuItemInterface } from '../../../shared/models/interfaces/base-menu-item.interface';
import { BaseMenuItemModal } from '../../../shared/models/base-menu-item.model';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import {
  MatrixAutoCompleteGroupOption,
  MatrixAutoCompleteOption
} from '../../../shared/models/utilities/matrix-auto-complete-option.model';
import { HashMapInterface } from 'src/app/shared/models/interfaces/utilities/matrix-hash-map-model.interface';
import { HashMap } from 'src/app/shared/models/utilities/matrix-hash-map.model';
import { of } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-type-a-head-image-search-performance',
  templateUrl: './type-a-head-image-search-performance.component.html',
  styleUrls: ['./type-a-head-image-search-performance.component.scss']
})
export class TypeAHeadImageSearchPerformanceComponent implements OnInit {

  @ViewChild('searchTextTypeAhead', { read: MatAutocompleteTrigger }) searchTextTypeAheadTrigger;
  @ViewChild(InfiniteScrollDirective) infiniteScroll: InfiniteScrollDirective;

  private imageUrlList: BaseMenuItemInterface[] = [];
  private isUpdateSearchIndexRequired: boolean = true;
  private productGroupHashMap: HashMapInterface<MatrixAutoCompleteGroupOption<string>> = null;

  // private lastSearchedValue: string = '';
  public filteredUrlList: BaseMenuItemInterface[] = [];
  public titleImageUrl: string = 'assets/images/jaypore/title.jpg';
  public totalImageCount = 0;

  public productForm: FormGroup = this.fb.group({
    productGroup: '',
  });

  public productGroups: MatrixAutoCompleteGroupOption<string>[] = [];

  public disableScroll: boolean = false;

  public productGroupOptions: Observable<MatrixAutoCompleteGroupOption<string>[]>;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

  public onScrollDown(event) {
    console.log('triggering infinite scroll');

    if (this.imageUrlList.length > 500) {
      return false;
    }

    this.infiniteScroll.ngOnDestroy();
    this.infiniteScroll.setup();

    // add another 20 items
    // const start = this.sum;
    // this.sum += 20;
    this.buildUrlList();
    this.cdr.detectChanges();
    // this.direction = 'down'
  }

  public onKeyUp(event) {
    const _searchText = this.productForm.get('productGroup').value;
    if (!_searchText || !_searchText.trim()) {
      if (this.filteredUrlList.length !== this.imageUrlList.length) {
        this.filteredUrlList = [...this.imageUrlList];
        this.cdr.detectChanges();
      }
      // return filteredProductGroupOptions;
    }
  }

  public searchFieldKeyDown(event) {

    if (event instanceof FocusEvent || event instanceof TouchEvent) {

      this.searchTextTypeAheadTrigger._onChange(this.productForm.get('productGroup').value);
      this.searchTextTypeAheadTrigger.openPanel();

      // setTimeout(() => this.doAutoCompleteOptionLookup(), 100);
      return;
    }

    if (this.isUpdateSearchIndexRequired) {
      this.isUpdateSearchIndexRequired = false;

      if (!this.productGroupHashMap) {
        this.productGroupHashMap = new HashMap<MatrixAutoCompleteGroupOption<string>>();
      }

      this.imageUrlList.map((imageItem) => {
        const imageGroupName = imageItem.label.slice(0, -4);
        let autoCompleteGroupOption = this.productGroupHashMap.get(imageGroupName);
        if (!autoCompleteGroupOption) {
          autoCompleteGroupOption = new MatrixAutoCompleteGroupOption<string>();
          autoCompleteGroupOption.setGroupTitle(imageGroupName);
        }

        const autoCompleteOption: MatrixAutoCompleteOption<string> = new MatrixAutoCompleteOption<string>();
        autoCompleteOption.setLabel(imageItem.label).setValue(imageItem.navigationRouteUrl);

        autoCompleteGroupOption.getOptions().push(autoCompleteOption);

        this.productGroupHashMap.put(imageGroupName, autoCompleteGroupOption);

      });
    }
    this.productGroupOptions = this.productForm.get('productGroup').valueChanges
      .pipe(
        startWith(''),
        map(searchText => {
          if (searchText && searchText.trim()) {
            return this.doAutoCompleteOptionLookup(searchText);
          }
        })
      );

    // this.filteredUrlList = this.productGroupOptions.map()
  }

  public onOptionSelected(optionText: string) {
    this.productGroupOptions = of(this.doAutoCompleteOptionLookup(optionText));
  }

  private doAutoCompleteOptionLookup(searchText: string) {

    const productGroupOptions: MatrixAutoCompleteGroupOption<string>[] =
      this.productGroupHashMap.getValues();

    const filteredProductGroupOptions: MatrixAutoCompleteGroupOption<string>[] = [];
    this.filteredUrlList = [];

    productGroupOptions.map(productGroupOption => {
      const _productGroupOption: MatrixAutoCompleteGroupOption<string> =
        Object.assign(new MatrixAutoCompleteGroupOption<string>(), productGroupOption);

      const productOptions: MatrixAutoCompleteOption<string>[] =
        _productGroupOption.getOptions().filter(option => {
          if (option.getLabel().trim().toUpperCase().indexOf(searchText.trim().toUpperCase()) >= 0) {
            this.filteredUrlList.push((new BaseMenuItemModal())
              .setLabel(option.getLabel())
              .setNavigationRouteUrl(option.getValue()));
            return true;
          }
        });

      _productGroupOption.setOptions(productOptions);

      filteredProductGroupOptions.push(_productGroupOption);


    });

    return filteredProductGroupOptions.filter(productGroup => {
      return productGroup.getOptions && productGroup.getOptions() &&
        productGroup.getOptions().length > 0;
    });

  }

  ngOnInit() {
    this.buildUrlList();
    // this.filteredUrlList = [...this.imageUrlList];
    this.filteredUrlList = this.imageUrlList;
  }

  public findMatches(event: KeyboardEvent, product?: MatrixAutoCompleteOption<string>) {
    setTimeout(() => {
      if (product) {
        const searchFieldValue = product.getLabel();
        this.imageUrlList.some((imageItem) => {
          if (imageItem.label.toUpperCase() === searchFieldValue.trim().toUpperCase()) {
            this.filteredUrlList = [imageItem];
            return true;
          }
          return false;
        });
      } else {
        const searchField: HTMLInputElement = <HTMLInputElement>event.target;
        const searchFieldValue = searchField.value;
        this.filteredUrlList = this.imageUrlList.filter((imageItem) => {
          return imageItem.label.toUpperCase().indexOf(searchFieldValue.trim().toUpperCase()) !== -1;
        });
      }
    }, 100);

  }

  private buildUrlList() {
    let buffer: BaseMenuItemInterface = new BaseMenuItemModal();
    buffer.setLabel('estacy-001')
      .setNavigationRouteUrl('assets/images/jaypore/estacy0w7m2a1z001.jpg');
    this.imageUrlList.push(buffer);

    buffer = null;
    buffer = new BaseMenuItemModal();
    buffer.setLabel('estacy-002')
      .setNavigationRouteUrl('assets/images/jaypore/estacy0w7m2a1z002.jpg');
    this.imageUrlList.push(buffer);

    for (let imgItr = 1; imgItr <= 10; imgItr++) {
      buffer = null;
      buffer = new BaseMenuItemModal();
      buffer.setLabel((imgItr === 10) ? 'shirt-010' : 'shirt-00' + imgItr)
        .setNavigationRouteUrl((imgItr === 10) ? 'assets/images/jaypore/shirt0w7m2a1z010.jpg'
          : 'assets/images/jaypore/shirt0w7m2a1z00' + imgItr + '.jpg');
      this.imageUrlList.push(buffer);
    }

    for (let imgItr = 1; imgItr <= 10; imgItr++) {
      buffer = null;
      buffer = new BaseMenuItemModal();
      buffer.setLabel((imgItr === 10) ? 'saray-010' : 'saray-00' + imgItr)
        .setNavigationRouteUrl((imgItr === 10) ? 'assets/images/jaypore/saray0w7m2a1z010.jpg'
          : 'assets/images/jaypore/saray0w7m2a1z00' + imgItr + '.jpg');
      this.imageUrlList.push(buffer);
    }

    for (let imgItr = 1; imgItr <= 10; imgItr++) {
      buffer = null;
      buffer = new BaseMenuItemModal();
      buffer.setLabel((imgItr === 10) ? 'pant-010' : 'pant-00' + imgItr)
        .setNavigationRouteUrl((imgItr === 10) ? 'assets/images/jaypore/pant0w7m2a1z010.jpg'
          : 'assets/images/jaypore/pant0w7m2a1z00' + imgItr + '.jpg');
      this.imageUrlList.push(buffer);
    }

    for (let imgItr = 1; imgItr <= 10; imgItr++) {
      buffer = null;
      buffer = new BaseMenuItemModal();
      buffer.setLabel((imgItr === 10) ? 'glove-010' : 'glove-00' + imgItr)
        .setNavigationRouteUrl((imgItr === 10) ? 'assets/images/jaypore/glove0w7m2a1z010.jpg'
          : 'assets/images/jaypore/glove0w7m2a1z00' + imgItr + '.jpg');
      this.imageUrlList.push(buffer);
    }

    for (let imgItr = 1; imgItr <= 10; imgItr++) {
      buffer = null;
      buffer = new BaseMenuItemModal();
      buffer.setLabel((imgItr === 10) ? 'shoe-010' : 'shoe-00' + imgItr)
        .setNavigationRouteUrl((imgItr === 10) ? 'assets/images/jaypore/10w7m2a1zshoe0w7m2a1z010.jpg' :
          'assets/images/jaypore/10w7m2a1zshoe0w7m2a1z00' + imgItr + '.jpg');
      this.imageUrlList.push(buffer);
    }

    for (let imgItr = 1; imgItr <= 10; imgItr++) {
      buffer = null;
      buffer = new BaseMenuItemModal();
      buffer.setLabel((imgItr === 10) ? 'sandals-010' : 'sandals-00' + imgItr)
        .setNavigationRouteUrl((imgItr === 10) ? 'assets/images/jaypore/20w7m2a1zsandals0w7m2a1z010.jpg' :
          'assets/images/jaypore/20w7m2a1zsandals0w7m2a1z00' + imgItr + '.jpg');
      this.imageUrlList.push(buffer);
    }

    for (let imgItr = 1; imgItr <= 10; imgItr++) {
      buffer = null;
      buffer = new BaseMenuItemModal();
      buffer.setLabel((imgItr === 10) ? 'Chudi-010' : 'Chudi-00' + imgItr)
        .setNavigationRouteUrl((imgItr === 10) ? 'assets/images/jaypore/30w7m2a1zChudi0w7m2a1z010.jpg' :
          'assets/images/jaypore/30w7m2a1zChudi0w7m2a1z00' + imgItr + '.jpg');
      this.imageUrlList.push(buffer);
    }

    for (let imgItr = 1; imgItr <= 10; imgItr++) {
      buffer = null;
      buffer = new BaseMenuItemModal();
      buffer.setLabel((imgItr === 10) ? 'handkerchief-010' : 'handkerchief-0' + imgItr)
        .setNavigationRouteUrl((imgItr === 10) ? 'assets/images/jaypore/40w7m2a1zhandkerchief0w7m2a1z010.jpg' :
          'assets/images/jaypore/40w7m2a1zhandkerchief0w7m2a1z00' + imgItr + '.jpg');
      this.imageUrlList.push(buffer);
    }

    for (let imgItr = 1; imgItr <= 10; imgItr++) {
      buffer = null;
      buffer = new BaseMenuItemModal();
      buffer.setLabel((imgItr === 10) ? 'belt-010' : 'belt-00' + imgItr)
        .setNavigationRouteUrl((imgItr === 10) ? 'assets/images/jaypore/50w7m2a1zbelt0w7m2a1z010.jpg' :
          'assets/images/jaypore/50w7m2a1zbelt0w7m2a1z00' + imgItr + '.jpg');
      this.imageUrlList.push(buffer);
    }

    for (let imgItr = 1; imgItr <= 10; imgItr++) {
      buffer = null;
      buffer = new BaseMenuItemModal();
      buffer.setLabel((imgItr === 10) ? 'briefs-010' : 'briefs-00' + imgItr)
        .setNavigationRouteUrl((imgItr === 10) ? 'assets/images/jaypore/60w7m2a1zbriefs0w7m2a1z010.jpg' :
          'assets/images/jaypore/60w7m2a1zbriefs0w7m2a1z00' + imgItr + '.jpg');
      this.imageUrlList.push(buffer);
    }

    for (let imgItr = 1; imgItr <= 10; imgItr++) {
      buffer = null;
      buffer = new BaseMenuItemModal();
      buffer.setLabel((imgItr === 10) ? 'inner-010' : 'inner-00' + imgItr)
        .setNavigationRouteUrl((imgItr === 10) ? 'assets/images/jaypore/70w7m2a1zinner0w7m2a1z010.jpg' :
          'assets/images/jaypore/70w7m2a1zinner0w7m2a1z00' + imgItr + '.jpg');
      this.imageUrlList.push(buffer);
    }

    for (let imgItr = 1; imgItr <= 10; imgItr++) {
      buffer = null;
      buffer = new BaseMenuItemModal();
      buffer.setLabel((imgItr === 10) ? 'suit-010' : '0' + imgItr)
        .setNavigationRouteUrl((imgItr === 10) ? 'assets/images/jaypore/suit0w7m2a1z010.jpg' :
          'assets/images/jaypore/suit0w7m2a1z00' + imgItr + '.jpg');
      this.imageUrlList.push(buffer);

      this.totalImageCount = this.imageUrlList.length;
    }
  }
}
