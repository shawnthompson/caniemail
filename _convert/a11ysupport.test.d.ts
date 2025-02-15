/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Browser = { [k: string]: unknown }[];

export interface Test {
	title: string;
	description: string;
	/**
	 * Key words that are used to help find features in a search
	 */
	keywords?: string[];
	/**
	 * path relative to the /data/tests/html directory. References the file that contains the test html.
	 */
	html_file?: string;
	assertions: Assertion[];
	commands?: {
		jaws?: At;
		nvda?: At;
		vo_ios?: At;
		vo_macos?: At;
		narrator?: At;
		android?: At;
		dragon_win?: At;
		[k: string]: unknown;
	};
	versions: {
		jaws?: AtVersion;
		nvda?: AtVersion;
		vo_ios?: AtVersion;
		vo_macos?: AtVersion;
		narrator?: AtVersion;
		android?: AtVersion;
		dragon_win?: AtVersion;
		[k: string]: AtVersion;
	};
	history: History[];
	[k: string]: unknown;
}
export interface Assertion {
	feature_id: string;
	feature_assertion_id: string;
	/**
	 * Must match the ID of a feature. Example: html/div_element
	 */
	applies_to?: string;
	references?: string[];
	/**
	 * A css selector that determines which elements in the example need to be tested.
	 */
	css_target?: string;
	/**
	 * an example of expected output; does not need to be exact. This can be helpful especially for things like computed accessible names and descriptions.
	 */
	expected_value?: string;
	/**
	 * an object of AT ids as keys and rationale as values. The presence of a key indicates that the AT is not applicable for the given reason. An example might be vc_ios on the convey_role assertion since vc_ios intentionally does not support this.
	 */
	exclude_at?: {
		[k: string]: unknown;
	};
	/**
	 * an object of browser ids as keys and rationale as values. The presence of a key indicates that the browser is not applicable for the given reason. An example might be that IE does not support an html5 form control.
	 */
	exclude_browsers?: {
		[k: string]: unknown;
	};
	browserNotes?: {
		chrome?: string;
		and_chr?: string;
		edge?: string;
		firefox?: string;
		and_ff?: string;
		ie?: string;
		ios_saf?: string;
		safari?: string;
		[k: string]: unknown;
	};
	[k: string]: unknown;
}
export interface At {
	chrome?: Browser;
	and_chr?: Browser;
	edge?: Browser;
	firefox?: Browser;
	and_ff?: Browser;
	ie?: Browser;
	ios_saf?: Browser;
	safari?: Browser;
	[k: string]: unknown;
}
export interface AtVersion {
	browsers: {
		chrome?: BrowserVersion;
		and_chr?: BrowserVersion;
		edge?: BrowserVersion;
		firefox?: BrowserVersion;
		and_ff?: BrowserVersion;
		ie?: BrowserVersion;
		ios_saf?: BrowserVersion;
		safari?: BrowserVersion;
		[k: string]: BrowserVersion;
	};
	[k: string]: unknown;
}
export interface BrowserVersion {
	at_version: string;
	browser_version: string;
	/**
	 * The OS version indicates what accessibility APIs are in use
	 */
	os_version: string;
	/**
	 * The date is required to help us determine which support points have priority for testing.
	 */
	date: string;
	[k: string]: unknown;
}
export interface History {
	date: string;
	message: string;
	[k: string]: unknown;
}
