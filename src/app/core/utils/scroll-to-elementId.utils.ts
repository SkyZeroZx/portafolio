/**
 * This function scrolls to a specified element on the page with optional scroll options.
 * @param {string} elementId - a string representing the ID of the HTML element to which the page
 * should be scrolled.
 * @param {ScrollIntoViewOptions} scrollIntoViewOptions - ScrollIntoViewOptions is an optional
 * parameter that specifies the behavior of the scrolling animation when the element is scrolled into
 * view. It can include properties such as `behavior`, `block`, and `inline`. The `behavior` property
 * determines whether the scrolling should be smooth or instant, while the `block`
 */
export function scrollTo(elementId: string, scrollIntoViewOptions: ScrollIntoViewOptions = DEFAULT_OPTIONS_SCROLL) {
	const element = document?.getElementById(elementId);
	element?.scrollIntoView(scrollIntoViewOptions);
}

export const DEFAULT_OPTIONS_SCROLL: ScrollIntoViewOptions = { behavior: 'smooth' };
