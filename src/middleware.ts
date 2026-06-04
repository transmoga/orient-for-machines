import { defineMiddleware } from 'astro:middleware';
import { isAuthenticated, PRIVATE_PATHS } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  if (pathname === '/login' || pathname.startsWith('/api/')) {
    return next();
  }

  const isPrivate = PRIVATE_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (isPrivate && !isAuthenticated(context)) {
    const nextUrl = encodeURIComponent(pathname + context.url.search);
    return context.redirect(`/login?next=${nextUrl}`);
  }

  return next();
});
