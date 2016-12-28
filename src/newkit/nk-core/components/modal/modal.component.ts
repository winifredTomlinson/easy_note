import { Component, OnInit, Input, Output, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';

const defaults = {
  backdrop: 'static',
  show: false,
  keyboard: false
};

@Component({
  selector: 'neg-modal',
  templateUrl: 'modal.component.html'
})
export class ModalComponent implements OnInit, AfterViewInit {

  private $modal: any;
  private $el: any;
  private isShown: boolean = false;
  private hasCustomHeader: boolean = false;
  private hasCustomFooter: boolean = false;

  @Input()
  private size: string;

  @Input()
  private width: number;

  @Input()
  private title: string;

  @Input()
  private animate: string = 'fade';

  @Input()
  private okText: string = 'Save changes';

  @Input()
  private cancelText: string = 'Close';

  @Input()
  private options: { backdrop?: boolean | string, show?: boolean, keyboard?: boolean }

  @Input()
  private onOk: () => Promise<any>;

  @Output()
  private onHidden: EventEmitter<any> = new EventEmitter();

  @Output()
  private onCancel: EventEmitter<any> = new EventEmitter();

  @Output()
  private onShown: EventEmitter<any> = new EventEmitter();

  @Input()
  private set shown(val) {
    this.isShown = val;
    this.shownChange.emit(this.isShown);
    if (!this.$modal) {
      return;
    }
    this.isShown ? this.showModal() : this.hideModal();
  }

  @Output()
  private shownChange = new EventEmitter();

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.$el = this.elementRef.nativeElement;
    this.$modal = window['jQuery'](this.$el.querySelector('.modal'));
    this.hasCustomHeader = !!this.$el.querySelector('[slot=modal-header]');
    this.hasCustomFooter = !!this.$el.querySelector('[slot=modal-footer]')
  }

  ngAfterViewInit() {
    this.configModalOptions();
    this.configModalEvents();
  }

  private configModalOptions() {
    this.$modal.modal(Object.assign({}, defaults, this.options));
  }

  private configModalEvents() {
    this.$modal.on('hidden.bs.modal', e => {
      this.shownChange.emit(false);
      this.onHidden.emit(e);
    });
    this.$modal.on('shown.bs.modal', e => {
      this.shownChange.emit(true);
      this.onShown.emit(e);
    });
  }

  showModal() {
    this.$modal.modal('show');
  }

  hideModal() {
    this.$modal.modal('hide');
  }

  onCancelClick() {
    this.onCancel.emit();
    this.hideModal();
  }

  onOkClick() {
    if (!this.onOk) {
      return this.hideModal();
    }
    Promise.resolve(this.onOk())
      .then(needClose => {
        if (needClose !== false) {
          this.hideModal();
        }
      }).catch(() => {
        this.hideModal();
      });
  }
}