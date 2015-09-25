var iframes = document.getElementsByTagName( 'iframe' );
var goodIframe = [];
var rtgBanners = [];

Object.keys( iframes ).forEach( function ( key ) {
  var item = iframes[key];
  if ( item.src && item.width == rtgBanner.width && item.height == rtgBanner.height ) {
    goodIframe.push( {
      item: item,
      src: item.src
    } );
  }
} );

if ( goodIframe.length > 0 ) {
  goodIframe[0].item.src = rtgBanner.src;  
}

goodIframe.length;