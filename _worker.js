export default {
  async fetch(request) {
    const country = request.cf?.country || '';
    const url = new URL(request.url);

    // Only redirect on the root path
    if (url.pathname === '/' || url.pathname === '/index.html') {
      if (country === 'BR') {
        return Response.redirect(new URL('/Landing Page BR.html', url.origin), 302);
      }
    }

    return fetch(request);
  }
}
