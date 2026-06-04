export default {
  async fetch(request, env) {
    const country = request.cf?.country || '';
    const url = new URL(request.url);

    // Redirect Brazilian visitors to the BR landing page
    if ((url.pathname === '/' || url.pathname === '/index.html') && country === 'BR') {
      return Response.redirect(new URL('/Landing%20Page%20BR.html', url.origin), 302);
    }

    // Serve static assets normally
    return env.ASSETS.fetch(request);
  }
}
