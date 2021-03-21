const computedWinDis = (ele: HTMLElement): { left: number; top: number } => {
  let totalLeft = ele.offsetLeft;
  let totalTop = ele.offsetTop;
  let parent = ele.offsetParent as HTMLElement;
  if (parent) {
    if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
      totalLeft += parent.clientLeft;
      totalTop += parent.clientTop;
    }
    totalLeft += parent.offsetLeft;
    totalTop += parent.offsetTop;
    parent = parent.offsetParent as HTMLElement;
  }
  return { left: totalLeft, top: totalTop };
};
export default computedWinDis;
