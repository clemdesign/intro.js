import getPropValue from "./getPropValue";
import isFixed from "./isFixed";

/**
 * Get an element position on the page relative to another element (or body)
 * Thanks to `meouw`: http://stackoverflow.com/a/442474/375966
 *
 * @api private
 * @returns Element's position info
 */
export default function getOffset(
  element: HTMLElement,
  relativeEl?: HTMLElement
): { width: number; height: number; left: number; top: number } {
  const body = document.body;
  const docEl = document.documentElement;
  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  relativeEl = relativeEl || body;

  const x = element.getBoundingClientRect();
  const xr = relativeEl.getBoundingClientRect();
  const relativeElPosition = getPropValue(relativeEl, "position");

  let obj = {
    width: x.width,
    height: x.height,
  };

  /*
  console.log('element', element.className);
  console.log('relativeEl', relativeEl.className, relativeEl.tagName.toLowerCase());
  // console.log('x.left - xr.left', x.left - xr.left, 'x.left', x.left, 'x.left + scrollLeft', x.left + scrollLeft);
  console.log('element', x);
  console.log('relativeEl', xr);
   */

  if (
    (relativeEl.tagName.toLowerCase() !== "body" &&
      relativeElPosition === "relative") ||
    relativeElPosition === "sticky"
  ) {
    // when the container of our target element is _not_ body and has either "relative" or "sticky" position, we should not
    // consider the scroll position but we need to include the relative x/y of the container element
    return Object.assign(obj, {
      top: x.top - xr.top,
      left: x.left - xr.left,
    });
  } else {
    if (isFixed(element)) {
      return Object.assign(obj, {
        top: x.top,
        left: x.left,
      });
    } else {
      return Object.assign(obj, {
        top: x.top + scrollTop,
        left: x.left + scrollLeft,
      });
    }
  }
}
