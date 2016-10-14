import { Injectable } from '@angular/core';

let noop = function () { };

export interface LayerOptions {
  type?: number; //【0】类型
  title?: string | boolean; //【'信息'】标题，false不显示标题
  content?: string | HTMLElement | Array<string>; // 【''】内容
  skin?: string; //【''】主题
  area?: string | Array<string>; //【'auto'】大小
  offset?: string | Array<string>; //【'auto'】位置，特殊位置: offset: 'rb'
  icon?: string; //【-1】图标（注意：插件本身是数字）
  btn?: string | Array<string>; //【'确认'】按钮
  closeBtn?: string | boolean; //【1】关闭按钮风格，设置false则不显示
  shade?: string | Array<any> | boolean; //【0.3】遮罩颜色
  shadeClose?: boolean; //【false】是否点击遮罩关闭
  time?: number; //【0】单位s（注意，插件本身是毫秒）
  id?: string; // 【''】设置之后，同一ID只能弹出一个
  shift?: number; //【0】 弹出动画
  maxmin?: boolean; //【false】是否允许最大最小化
  fix?: boolean; //【true】 固定位置（不跟随滚动）
  scrollbar?: boolean; //【true】是否允许浏览器滚动
  maxWidth?: number; //【360】最大宽度，当aera:'auto'时才有效
  zIndex?: number; //【19891014】z-index层次
  move?: string | HTMLElement | boolean; //【'.layui-layer-title'】触发拖拽的元素
  moveType?: number; //【0】拖拽风格
  moveOut?: number; //【false】是否允许拖动到窗口外
  moveEnd?: Function; //【null】 拖动完毕之后的回调方法
  success?: Function; // 层弹出完毕
  yes?: Function; //点击了确定按钮回调
  cancel?: Function; //点击了取消按钮回调
  end?: Function; //层销毁
  btn1?: Function;
  btn2?: Function;
  btn3?: Function;
  btn4?: Function;
  btn5?: Function;
}

let iconMap = {
  'info': 0,
  'success': 1,
  'error': 2,
  'question': 3,
  'lock': 4,
  'sad': 5,
  'smile': 6
};

let getIcon = (iconType) => {
  let value = iconMap[iconType];
  return value >= 0 ? value : -1;
}

let getOptions = (options: LayerOptions, defaults?: any) => {

  let opt = _.extend({}, defaults || {}, options);
  if (opt.icon !== undefined) {
    opt.icon = getIcon(opt.icon);
  }
  if (opt.time !== undefined) {
    opt.time *= 1000;
  }
  return opt;
};

@Injectable()
export class NegAlert {
  constructor() {
    // 设置默认参数
    layer.config({
      shift: 4
    });
  }

  info(msg: string, callback?: Function) {
    return this.msg(msg, { icon: 'info' }, callback);
  }

  success(msg: string, callback?: Function) {
    return this.msg(msg, { icon: 'success' }, callback);
  }

  error(msg: string, callback?: Function) {
    return this.msg(msg, { icon: 'error' }, callback);
  }

  msg(msg: string, options?: LayerOptions, callback?: Function) {
    return layer.msg(msg, getOptions(options), callback || noop);
  }

  alert(content, options?: LayerOptions, okCallback?: Function) {
    return layer.alert(content, getOptions(options, { title: 'Message' }), okCallback);
  }

  confirm(content, options?: LayerOptions, okCallback?: Function, cancelCallback?: Function) {
    return layer.confirm(content, getOptions(options, {
      title: 'Confirm',
      icon: 'question'
    }), okCallback || noop, cancelCallback || noop)
  }

  prompt(content, options?: any, callback?: Function) {
    options = options || {};
    let opt: any = { title: 'Prompt', btn: ['OK', 'CANCEL'] };
    opt.formType = this._getPromptType(options.type);
    opt.value = content;
    if (_.isNumber(options.maxlength)) {
      opt.maxlength = options.maxlength;
    }
    if (_.isString(options.title)) {
      opt.title = options.title;
    }
    return layer.prompt(opt, (value, index, elem) => {
      (callback || noop)(index);
    });
  }

  notice(content, options?: any, callback?: Function) {
    return this.open(getOptions(options, {
      type: 1,
      title: false,
      closeBtn: false, //不显示关闭按钮
      shade: [0],
      area: options.area || ['340px', '215px'],
      offset: 'rb', //右下角弹出
      time: options.time || 3, //2秒后自动关闭
      shift: 2,
      content: content, //iframe的url，no代表不显示滚动条
      end: () => {
        (callback || noop)();
      }
    }), true);
  }

  open(options: LayerOptions, notProcessOptions?: boolean) {
    let opt = notProcessOptions ? options : getOptions(options)
    return layer.open(opt);
  }

  _getPromptType(type) {
    switch (type) {
      case 'password':
        return 1;
      case 'textarea':
        return 2;
    }
    return 0;
  }

  close(index: number) {
    layer.close(index);
  }

  closeAll(type: string) {
    if (type) {
      layer.closeAll(type);
      return;
    }
    layer.closeAll();
  }
};