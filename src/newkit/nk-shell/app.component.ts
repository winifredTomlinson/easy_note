import { Component, OnInit, AfterContentInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'nk-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.styl')]
})
export class AppComponent implements OnInit, AfterContentInit {
  constructor() { }

  ngOnInit() { }

  ngAfterContentInit() {
    $(function () {
      $('.nk-menu li').on('click', function (e) {
        var $this = $(this);
        $this[$this.hasClass('open') ? 'removeClass' : 'addClass']('open');
        if ($this.find('ul').length === 0) {
          $('.nk-menu li').removeClass('active');
          $this.addClass('active').parents('li').addClass('active');
        }
        return false;
      });
    });
  }

}