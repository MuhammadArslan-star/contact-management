import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/** Resolves app API paths such as `/contacts` using the environment base URL. */
export const apiUrlInterceptor: HttpInterceptorFn = (request, next) => {
  // Absolute URLs (for example, avatar images) must never be rewritten.
  if (/^https?:\/\//i.test(request.url)) {
    return next(request);
  }

  const baseUrl = environment.apiUrl.replace(/\/$/, '');
  const path = request.url.startsWith('/') ? request.url : `/${request.url}`;

  return next(request.clone({ url: `${baseUrl}${path}` }));
};
