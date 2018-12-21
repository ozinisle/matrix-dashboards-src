import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MultiValueFieldComponentInputModelInterface, MultiValueFieldComponentOutputModelInterface } from './multi-value-field.interface';
import { MultiValueFieldComponentOutputModel } from './multi-value-field.model';

@Component({
  selector: 'app-multi-value-field',
  templateUrl: './multi-value-field.component.html',
  styleUrls: ['./multi-value-field.component.scss']
})
export class MultiValueFieldComponent implements OnInit {

  @Input() componentInput: MultiValueFieldComponentInputModelInterface;
  @Output() componentOutput: EventEmitter<MultiValueFieldComponentOutputModelInterface>
    = new EventEmitter<MultiValueFieldComponentOutputModelInterface>();

  public componentPrefix: string = '';
  private outputValue: MultiValueFieldComponentOutputModelInterface = new MultiValueFieldComponentOutputModel();

  constructor() { }

  ngOnInit() {
    this.outputValue.multiValueArrayList = this.componentInput.multiValueArrayList;
    if (!this.componentInput.noPrefix) {
      this.componentPrefix = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    }
  }

  clearField() {

  }

  trackByFn(index: any, item: any) {
    return index;
  }

  addEntry() {
    if (!this.outputValue.multiValueArrayList) {
      this.outputValue.multiValueArrayList = [];
    }
    this.outputValue.multiValueArrayList.push('');
    this.componentOutput.emit(this.outputValue);
  }

}


