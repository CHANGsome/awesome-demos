function computedWinDis(ele: HTMLElement): { left: number; top: number } {
  let eleParent = ele.offsetParent as HTMLElement;
  let left = ele.offsetLeft;
  let top = ele.offsetTop;
  while (eleParent) {
    /*
     *  ps: ie8中会有一个问题如果在ie8中就不加父级的边框了。因为已经加过了。
     *  判断我的当前浏览器是不是ie8   1 可以用正则 test MSIE 8.0   2 字符串
     *  中的indexOf MSIE 8.0 判断 -1. window.navigator.userAgent
     * */
    if (window.navigator.userAgent.indexOf('MSIE 8.0') !== -1) {
      //ie8
      left += eleParent.offsetLeft;
      top += eleParent.offsetTop;
    } else {
      left += eleParent.clientLeft + eleParent.offsetLeft;
      top += eleParent.clientTop + eleParent.offsetTop;
    }
    eleParent = eleParent.offsetParent as HTMLElement;
  }
  return { left, top };
}
export default computedWinDis;
