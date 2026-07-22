import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Wraps the part(s) of `value` matching the search `term` in a
 * `<mark class="search-hl">` element and returns trusted HTML for `[innerHTML]`.
 *
 * - Case-insensitive, partial matching.
 * - The original text is HTML-escaped first, so contact data can never inject
 *   markup — only the fixed `<mark>` wrapper we add is real HTML.
 * - Result is marked trusted via DomSanitizer (we build the HTML ourselves).
 * - `active` (default true) lets callers suppress highlighting for a given field
 *   (e.g. the role subtitle) while still safely escaping it.
 *
 * Usage: `<span [innerHTML]="fullName | searchHighlight: searchQuery"></span>`
 */
@Pipe({ name: 'searchHighlight', standalone: true, pure: true })
export class SearchHighlightPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(value: string | null | undefined, term: string | null | undefined, active = true): SafeHtml {
    const text = value ?? '';
    const needle = (term ?? '').trim().toLocaleLowerCase();

    if (!active || !needle || !text) {
      return this.sanitizer.bypassSecurityTrustHtml(this.escape(text));
    }

    const haystack = text.toLocaleLowerCase();
    let html = '';
    let cursor = 0;
    let index = haystack.indexOf(needle);

    while (index !== -1) {
      html += this.escape(text.slice(cursor, index));
      const match = text.slice(index, index + needle.length);
      html += `<mark class="search-hl">${this.escape(match)}</mark>`;
      cursor = index + needle.length;
      index = haystack.indexOf(needle, cursor);
    }
    html += this.escape(text.slice(cursor));

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  /** Escapes the five HTML-significant characters to prevent injection. */
  private escape(input: string): string {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
