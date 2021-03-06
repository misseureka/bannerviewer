function checkSize( item, rtgBanner ) {
  return item.clientWidth >= rtgBanner.width - 10 && item.clientWidth <= rtgBanner.width + 10 &&
    item.clientHeight >= rtgBanner.height - 10 && item.clientHeight <= rtgBanner.height + 10 ||
    item.width >= rtgBanner.width - 10 && item.width <= rtgBanner.width + 10 &&
    item.height >= rtgBanner.height - 10 && item.height <= rtgBanner.height + 10;
}

function findParent( item, rtgBanner ) {
  var parent = item.parentElement;
  if ( !parent ) {
    return;
  }
  if ( parent.nodeName == "DIV" && checkSize( item, rtgBanner ) ) {
    return { item: parent, html: parent.innerHTML, isIframe: false };
  }
  else {
    return findParent( parent, rtgBanner );
  }
}

function getGoodItems( items, goodItems, rtgBanner, getParent ) {
  for ( var i = 0; i < items.length; i++ ) {
    var item = items[i];
    if ( checkSize( item, rtgBanner ) ) {
      if ( getParent ) {
        goodItems.push( findParent( item, rtgBanner ) );
      }
      else {
        goodItems.push( {
          item: item,
          src: item.src,
          isIframe: true
        } );
      }
    }
  }
}

var iframes = document.getElementsByTagName( 'iframe' ),
  images = document.getElementsByTagName( 'img' ),
  objects = document.getElementsByTagName( 'object' );

var goodItems = [];

getGoodItems( iframes, goodItems, rtgBanner, false );
getGoodItems( images, goodItems, rtgBanner, true );
getGoodItems( objects, goodItems, rtgBanner, true );

if ( goodItems.length > 0 ) {
  if ( goodItems[0].isIframe ) {
    goodItems[0].item.src = rtgBanner.src;
  }
  else {
    goodItems[0].item.innerHTML = rtgBanner.html;
  }
}

goodItems.length;