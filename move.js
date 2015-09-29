--oldIndex;
--newIndex;

if ( goodItems[oldIndex].isIframe ) {
  goodItems[oldIndex].item.src = goodItems[oldIndex].src;
}
else {
  goodItems[oldIndex].item.innerHTML = goodItems[oldIndex].html;
}

if ( goodItems[newIndex].isIframe ) {
  goodItems[newIndex].item.src = rtgBanner.src;
}
else {
  goodItems[newIndex].item.innerHTML = rtgBanner.html;
}


