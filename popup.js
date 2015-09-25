function insertBanner() {
  var url = '//' + document.getElementById( 'url' ).value.split('//')[1],
    size = document.getElementsByTagName( 'select' )[0].value.split( ' x ' );

  chrome.tabs.executeScript( null, {
    code: 'var rtgBanner = {src: "' + url + '", width: ' + size[0] + ', height: ' + size[1] + '};'
  }, function () {
    chrome.tabs.executeScript( null, { file: 'insert.js' } );
  } );
}

document.addEventListener( 'DOMContentLoaded', function () {
  var insertBtn = document.getElementById( 'insert' );
  insertBtn.addEventListener( 'click', insertBanner );
} );