/* ============================================
   tabs.js — 可复用选项卡组件
   作者: 刘丁荣
   建立时间: 2026-11-04 13:42
   使用大模型: GLM-5.3-Flash
   功能: 通过外部引用方式，为页面内任意 .ldr_tabs 容器
         提供选项卡交互（可同页多实例复用）
   ============================================ */

'use strict';

/* 功能：把任意一个 .ldr_tabs 容器初始化为选项卡组件——为容器内每个 tab 按钮绑定监听事件（点击 + 键盘） */
function ldr_initTabs(ldr_root) {
  var ldr_tabList = ldr_root.querySelectorAll('.ldr_tab');
  for (var i = 0; i < ldr_tabList.length; i++) {
    ldr_tabList[i].addEventListener('click', function () {
      ldr_switchTab(this, ldr_root);
    });
    ldr_tabList[i].addEventListener('keydown', function (ldr_event) {
      ldr_handleKey(ldr_event, ldr_root);
    });
  }
}

/* 功能：选项卡切换核心逻辑——第一步先清除所有选项卡与面板的选中状态，第二步再设置当前点击元素的选中状态并显示对应面板 */
function ldr_switchTab(ldr_current, ldr_root) {
  var ldr_tabList = ldr_root.querySelectorAll('.ldr_tab');
  var ldr_panelList = ldr_root.querySelectorAll('.ldr_panel');
  var i;

  // 第一步：先清除所有选项卡的选中状态（按钮与内容面板一起复位）
  for (i = 0; i < ldr_tabList.length; i++) {
    ldr_tabList[i].classList.remove('ldr_tab--active');
    ldr_tabList[i].setAttribute('aria-selected', 'false');
  }
  for (i = 0; i < ldr_panelList.length; i++) {
    ldr_panelList[i].classList.remove('ldr_panel--active');
    ldr_panelList[i].hidden = true;
  }

  // 第二步：再设置当前元素的选中状态，并显示 data-ldr-panel 指向的面板
  ldr_current.classList.add('ldr_tab--active');
  ldr_current.setAttribute('aria-selected', 'true');
  var ldr_target = ldr_root.querySelector('#' + ldr_current.getAttribute('data-ldr-panel'));
  if (ldr_target) {
    ldr_target.classList.add('ldr_panel--active');
    ldr_target.hidden = false;
  }
}

/* 功能：键盘左右方向键在选项卡之间移动焦点并触发切换，提升无障碍操作体验 */
function ldr_handleKey(ldr_event, ldr_root) {
  var ldr_key = ldr_event.key;
  if (ldr_key !== 'ArrowLeft' && ldr_key !== 'ArrowRight') {
    return;
  }
  var ldr_tabList = Array.prototype.slice.call(ldr_root.querySelectorAll('.ldr_tab'));
  var ldr_index = ldr_tabList.indexOf(document.activeElement);
  if (ldr_index < 0) {
    return;
  }
  var ldr_next = ldr_key === 'ArrowRight'
    ? (ldr_index + 1) % ldr_tabList.length
    : (ldr_index - 1 + ldr_tabList.length) % ldr_tabList.length;
  ldr_tabList[ldr_next].focus();
  ldr_switchTab(ldr_tabList[ldr_next], ldr_root);
  ldr_event.preventDefault();
}

/* 功能：页面加载完成后自动初始化文档中所有 .ldr_tabs 容器，一个脚本同时驱动多个互不干扰的选项卡实例 */
window.addEventListener('DOMContentLoaded', function () {
  var ldr_allTabs = document.querySelectorAll('.ldr_tabs');
  for (var i = 0; i < ldr_allTabs.length; i++) {
    ldr_initTabs(ldr_allTabs[i]);
  }
});
