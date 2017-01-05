// 待导入的组件
import { Page1Component } from './page1/page1.component'

// 导出单个组件
export {
  Page1Component
};

// 导出所有页面，方便在module中一次性注入
export const ALL_PAGES = [
  Page1Component
];