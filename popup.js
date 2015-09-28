var iframeCount = 0,
  currentIframe = 1;

function validateForm(url, size) {
  var err = '';

  if ( !url.trim() ) {
    err += 'Пожалуйста, введите url баннера.\n';
  }
  if ( !size ) {
    err += 'Пожалуйста, выберите размер баннера.';
  }

  if ( err ) {
    document.getElementById( 'error' ).innerHTML = err;
    return false;
  }
  else {
    document.getElementById( 'error' ).innerHTML = '';
    return true;
  }
}

function saveOptions( url, sizeIndex ) {
  chrome.storage.sync.set( {rtgBannerOptions: {url: url, sizeIndex: sizeIndex}} );
}

function getOptions() {
  chrome.storage.sync.get( 'rtgBannerOptions', function ( val ) {
    var rtgBannerOptions = val.rtgBannerOptions;
    if ( rtgBannerOptions.url ) {
      document.getElementById( 'url' ).value = rtgBannerOptions.url;
    }
    if ( rtgBannerOptions.sizeIndex ) {
      document.getElementsByTagName( 'select' )[0].value = rtgBannerOptions.sizeIndex;
    }
  } );  
}

function insertBanner() {  
  var url = document.getElementById( 'url' ).value,
    sizeIndex = document.getElementsByTagName( 'select' )[0].value;  

  if ( !validateForm( url, sizeIndex ) ) {
    return;
  }

  //saveOptions( url, sizeIndex );

  url = '//' + url.split( '//' )[1];
  var size = document.getElementsByTagName( 'select' )[0].options[sizeIndex].text.split( ' x ' );  

  chrome.tabs.executeScript( null, {
    code: 'var rtgBanner = {src: "' + url + '", width: ' + size[0] + ', height: ' + size[1] + '};'
  }, function () {
    chrome.tabs.executeScript( null, { file: 'insert.js' }, function ( result ) {
      iframeCount = result;
      if ( iframeCount == 0 ) {
        document.getElementById( 'error' ).innerHTML = 'Не найдено ни одного iframe с заданными размерами';
      }
      else if ( iframeCount > 1 ) {
        document.getElementById( 'next-btn' ).disabled = false;
      }
    } );
  } );
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

function clearPage() {
  document.getElementById( 'error' ).innerHTML = '';
  document.getElementById( 'url' ).value = '';
  document.getElementById( 'prev-btn' ).disabled = true;
  document.getElementById( 'next-btn' ).disabled = true;
  chrome.tabs.executeScript( null, { file: 'clear.js' } );
}

document.addEventListener( 'DOMContentLoaded', function () {
  //getOptions();
  document.getElementById( 'insert' ).addEventListener( 'click', insertBanner );
  document.getElementById( 'clear' ).addEventListener( 'click', clearPage );
  document.getElementById( 'next-btn' ).addEventListener( 'click', changeIframe );
  document.getElementById( 'prev-btn' ).addEventListener( 'click', changeIframe );
} );