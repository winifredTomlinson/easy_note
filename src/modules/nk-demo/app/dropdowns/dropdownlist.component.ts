import { Component, OnInit } from '@angular/core';

@Component({
  template: require('./dropdownlist.component.html')
})
export class DropdownListComponent implements OnInit {

  private listItems: Array<string> = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  private list2Items: Array<{ text: string, value: number }> = [
    { text: 'Foo', value: 1 },
    { text: 'Bar', value: 2 },
    { text: 'Baz', value: 3 }
  ];

  private defaultItem: { text: string, value: number } = { text: 'Select...', value: null };

  private selectedValue: number = 2;

  constructor() { }

  ngOnInit() { }
}