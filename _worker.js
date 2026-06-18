export default {
  async fetch(request, env) {
    const country = request.cf?.country || '';
    const ua = request.headers.get('user-agent') || '';
    const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(ua);
    const url = new URL(request.url);
    const isRoot = url.pathname === '/' || url.pathname === '/index.html';

    if (isRoot) {
      if (country === 'BR') {
        // Brazilian visitors: mobile gets mobile page, desktop gets desktop page
        const target = isMobile ? '/Vortaris%20Mobile.html' : '/landing-br.html';
        return Response.redirect(new URL(target, url.origin), 302);
      } else {
        // Everyone else: mobile gets EN mobile page, desktop gets EN desktop (index.html)
        if (isMobile) {
          return Response.redirect(new URL('/Vortaris%20Mobile%20EN.html', url.origin), 302);
        }
        return env.ASSETS.fetch(new Request(new URL('/index.html', url.origin), request));
      }
    }

    // Old archived URLs → redirect to correct active pages
    if (url.pathname === '/Landing%20Page' || url.pathname === '/Landing%20Page.html') {
      const target = isMobile ? '/Vortaris%20Mobile%20EN.html' : '/';
      return Response.redirect(new URL(target, url.origin), 301);
    }
    if (url.pathname === '/Landing%20Page%20BR' || url.pathname === '/Landing%20Page%20BR.html') {
      const target = isMobile ? '/Vortaris%20Mobile.html' : '/landing-br.html';
      return Response.redirect(new URL(target, url.origin), 301);
    }

    // Mobile visiting desktop pages directly → redirect to correct mobile page
    if (isMobile && (url.pathname === '/landing-br' || url.pathname === '/landing-br.html')) {
      return Response.redirect(new URL('/Vortaris%20Mobile.html', url.origin), 302);
    }
    if (isMobile && url.pathname === '/index.html') {
      return Response.redirect(new URL('/Vortaris%20Mobile%20EN.html', url.origin), 302);
    }

    // Serve static assets normally
    return env.ASSETS.fetch(request);
  }
}
