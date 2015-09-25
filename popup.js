var iframeCount = 0,
  currentIframe = 1;

function insertBanner() {
  var url = '//' + document.getElementById( 'url' ).value.split('//')[1],
    size = document.getElementsByTagName( 'select' )[0].value.split( ' x ' );  

  chrome.tabs.executeScript( null, {
    code: 'var rtgBanner = {src: "' + url + '", width: ' + size[0] + ', height: ' + size[1] + '};'
  }, function () {
    chrome.tabs.executeScript( null, { file: 'insert.js' }, function ( result ) {
      iframeCount = result;
    } );
  } );
  if ( iframeCount > 1 ) {
    document.getElementById( 'next-btn' ).disabled = false;
  }   
}

function changeIframe( e ) {
  var oldIndex = currentIframe;
  if ( e.target.getAttribute( 'data-nav' ) == '+' ) {
    currentIframe += 1;
  }
  else {
    currentIframe -= 1;
  }
  if ( currentIframe == 1 ) {
    document.getElementById( 'prev-btn' ).disabled = true;
    document.getElementById( 'next-btn' ).disabled = false;
  }
  else if ( currentIframe == iframeCount ) {
    document.getElementById( 'prev-btn' ).disabled = false;
    document.getElementById( 'next-btn' ).disabled = true;
  }
  else {
    document.getElementById( 'prev-btn' ).disabled = false;
    document.getElementById( 'next-btn' ).disabled = false;
  }

  chrome.tabs.executeScript( null, {
    code: 'var oldIndex =' + oldIndex + '; var newIndex =' + currentIframe +';'
  }, function () {
    chrome.tabs.executeScript( null, { file: 'move.js' } );
  } );
}

document.addEventListener( 'DOMContentLoaded', function () {
  var insertBtn = document.getElementById( 'insert' );
  insertBtn.addEventListener( 'click', insertBanner );
} );

document.addEventListener( 'DOMContentLoaded', function () {  
  document.getElementById( 'next-btn' ).addEventListener( 'click', changeIframe );
  document.getElementById( 'prev-btn' ).addEventListener( 'click', changeIframe );
} );