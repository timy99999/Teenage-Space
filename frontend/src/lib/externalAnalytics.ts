const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const YM_ID = import.meta.env.VITE_YANDEX_METRIKA_ID;

/** Injects GA4 / Yandex Metrika only when their id env vars are set — so a
 *  deploy with nothing configured loads neither, instead of sending events to
 *  a placeholder id. (Search Console / Yandex Webmaster verification meta tags
 *  live as static placeholders in index.html — Vite's HTML env replacement fills
 *  them at build time, so they're visible even to crawlers that don't run JS.)
 *  Call once at app bootstrap (see main.tsx). */
export function initExternalAnalytics() {
  if (GA_ID) {
    const loader = document.createElement('script');
    loader.async = true;
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(loader);

    const init = document.createElement('script');
    init.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`;
    document.head.appendChild(init);
  }

  if (YM_ID) {
    const init = document.createElement('script');
    init.textContent = `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${YM_ID},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true});`;
    document.head.appendChild(init);

    const fallback = document.createElement('noscript');
    fallback.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${YM_ID}" style="position:absolute;left:-9999px" alt="" /></div>`;
    document.body.appendChild(fallback);
  }
}
