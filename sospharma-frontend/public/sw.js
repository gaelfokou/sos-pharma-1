if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>i(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/LkQiT84DZL72y6DDkQl8X/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/LkQiT84DZL72y6DDkQl8X/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/13b76428-7f9834f11c793e4f.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/160-a24e55e7b4cecd42.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/190-242e2d893d06eb1f.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/194-09fcf668ff1d2873.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/276-391a839cdb0f8822.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/444-ee2db46bc2c0397f.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/671-65d2a4d3ca81a8b8.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/759-0afb7e2161ee7e17.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/7ce798d6-d1e732d2c4a9741f.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/821-dd8a8ca3e6d077c8.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/app/_not-found/page-505417d477f8edbf.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/app/dashboard/page-8a90b4d072c69457.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/app/layout-bbcacbfc547e38d2.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/app/login/page-1ac51db111766908.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/app/order-drug/page-3d10494d9c2cff1f.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/app/order-list/page-db2729332f3df380.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/app/page-9ae8c6b644fbc14c.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/fd9d1056-eac63fb7d10b64ed.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/main-98d822ece4460d28.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/main-app-f387adade500bdd3.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-90e93e7673bc1e65.js",revision:"LkQiT84DZL72y6DDkQl8X"},{url:"/_next/static/css/28cea32de0717b92.css",revision:"28cea32de0717b92"},{url:"/_next/static/css/58eb8d6a463f6598.css",revision:"58eb8d6a463f6598"},{url:"/_next/static/css/8584ffabdd5f8c16.css",revision:"8584ffabdd5f8c16"},{url:"/_next/static/css/9e450156352cb4bc.css",revision:"9e450156352cb4bc"},{url:"/_next/static/media/flags.f0b93e18.png",revision:"f0b93e18"},{url:"/_next/static/media/flags@2x.77c72ad9.png",revision:"77c72ad9"},{url:"/_next/static/media/fontawesome-webfont.2b13baa7.eot",revision:"2b13baa7"},{url:"/_next/static/media/fontawesome-webfont.8a7cb27d.ttf",revision:"8a7cb27d"},{url:"/_next/static/media/fontawesome-webfont.cf011583.woff",revision:"cf011583"},{url:"/_next/static/media/fontawesome-webfont.da909aa0.svg",revision:"da909aa0"},{url:"/_next/static/media/fontawesome-webfont.e9955780.woff2",revision:"e9955780"},{url:"/_next/static/media/globe.e87313ef.png",revision:"e87313ef"},{url:"/_next/static/media/globe@2x.1a730637.png",revision:"1a730637"},{url:"/_next/static/media/logo-sos-pharma.cc753f2b.png",revision:"bea3074863f4d778f9fb0f264d400068"},{url:"/favicon.png",revision:"bea3074863f4d778f9fb0f264d400068"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:i})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&i&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:i})=>"1"===e.headers.get("RSC")&&i&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
