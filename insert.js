var iframes = document.getElementsByTagName( 'iframe' );
var goodIframe = [];
var rtgBanners = [];


for ( var i = 0; i < iframes.length; i++ ) {
  var item = iframes[i];
  if ( item.width == rtgBanner.width && item.height == rtgBanner.height ) {
    goodIframe.push( {
      item: item,
      src: item.src
    } );
  }
}

if ( goodIframe.length > 0 ) {
  goodIframe[0].item.src = rtgBanner.src;
}

goodIframe.length;