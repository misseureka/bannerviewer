function insertBanner() {
  var size = document.getElementsByTagName( 'select' )[0].value.split( ' x ' );
  var width = size[0],
    height = size[1];

  chrome.tabs.executeScript( null, {
    code: 'var rtgBannerWidth=' + width + '; var rtgBannerHeight=' + height + ';'
  }, function () {
    chrome.tabs.executeScript( null, { file: 'insert.js' } );
  } );
}

document.addEventListener( 'DOMContentLoaded', function () {
  var insertBtn = document.getElementById( 'insert' );
  insertBtn.addEventListener( 'click', insertBanner );
} );