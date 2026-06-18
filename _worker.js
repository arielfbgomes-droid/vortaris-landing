export default {
  async fetch(request, env) {
    const country = request.cf?.country || '';
    const ua = request.headers.get('user-agent') || '';
    const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(ua);
    const url = new URL(request.url);
    const isRoot = url.pathname === '/';

    if (isRoot) {
      const forceLang = url.searchParams.get('lang');
      if (country === 'BR' && forceLang !== 'en') {
        const target = isMobile ? '/Vortaris%20Mobile.html' : '/landing-br.html';
        return Response.redirect(new URL(target, url.origin), 302);
      }
      if (isMobile) {
        return Response.redirect(new URL('/Vortaris%20Mobile%20EN.html', url.origin), 302);
      }
      return env.ASSETS.fetch(new Request(new URL('/index.html', url.origin), request));
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

    // /index.html — serve English desktop directly, no country redirect
    if (url.pathname === '/index.html') {
      if (isMobile) return Response.redirect(new URL('/Vortaris%20Mobile%20EN.html', url.origin), 302);
      return env.ASSETS.fetch(new URL('/index.html', url.origin).toString());
    }

    // Mobile visiting desktop pages directly → redirect to correct mobile page
    if (isMobile && (url.pathname === '/landing-br' || url.pathname === '/landing-br.html')) {
      return Response.redirect(new URL('/Vortaris%20Mobile.html', url.origin), 302);
    }

    // Serve static assets normally
    return env.ASSETS.fetch(request);
  }
}
