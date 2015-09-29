for ( var i = 0; i < goodItems.length; i++ ) {
  if ( goodItems[i].isIframe ) {
    goodItems[i].item.src = goodItems[i].src;
  }
  else {
    goodItems[i].item.innerHTML = goodItems[i].html;
  }
}
