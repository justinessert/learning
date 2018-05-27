import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements AfterViewInit, OnChanges {
  _listFilter: string;

  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  hitMessage: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('filterInput') filterElementRef: ElementRef;

  get listFilter() {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(this.listFilter);
  }
  // Watches for changes on the input vars not all vars
  ngOnChanges(changes: SimpleChanges): void {
    if( changes['hitCount'] && !changes['hitCount'].currentValue ) {
      this.hitMessage = "No Matches Found"
    } else {
      this.hitMessage = "Hit Count: " + this.hitCount;
    }
  }

  constructor() {

  }

  // Sets focus to this input box on load
  ngAfterViewInit(): void {
    // For compatibility with older browsers
    if(this.filterElementRef.nativeElement){
      this.filterElementRef.nativeElement.focus();
    }
  }

}
