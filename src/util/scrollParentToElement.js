import getScrollParent from "./getScrollParent";

/**
 * scroll a scrollable element to a child element
 *
 * @param {Object} targetElement
 */
export default function scrollParentToElement(targetElement) {
  const element = targetElement.element;

  if (!this._options.scrollToElement) return;

  const parent = getScrollParent(element);

  const scrollEl = this._introItems[this._currentStep].scrollElRef || this._options.scrollElRef || parent;

  if (scrollEl === document.body) return;

  scrollEl.scrollTop = element.offsetTop - scrollEl.offsetTop;
}
