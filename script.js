/**
 *  GitHub user-name/repository copy support tool
 *
 *  - makes the repository-icon clickable.
 *  - when it clicked, copy user-name/repository-name to the clipboard.
 *  - and notify with toast.
 */

const getRepoSlug = function() {
  let ss = location.pathname.slice(1).split('/');
  if (ss.length < 2) return '';
  return `${ss[0]}/${ss[1]}`;
};

const copyStringToClipboard = function(str) {
  let ta = document.createElement('textarea');
  ta.value = str;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
};

const showToast = function(message) {
  let elem = document.createElement('div');
  elem.innerHTML = message;
  elem.style.position = 'fixed';
  elem.style.bottom = '5%';
  elem.style.left = '5%';
  elem.style.zIndex = 1;

  elem.style.fontFamily = '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif';
  elem.style.fontSize = '20px';
  elem.style.fontWeight = '600';
  elem.style.color = 'GAINSBORO';
  elem.style.backgroundColor = '#333333';
  elem.style.textAlign = 'center';

  elem.style.minWidth = '350px';
  elem.style.paddingTop = '15px';
  elem.style.paddingBottom = '15px';
  elem.style.paddingLeft = '30px';
  elem.style.paddingRight = '30px';
  elem.style.borderRadius = '3px';
  elem.style.boxShadow = '0 0 24px gray';

  document.body.appendChild(elem);
  window.setTimeout(function() {
    document.body.removeChild(elem);
  }, 3000);
};

const main = function() {
  let elems = document.querySelectorAll('.octicon-repo, .octicon-lock');
  [].forEach.call(elems, function(elem) {
    elem.style.color = 'blue';
    elem.addEventListener('click', function() {
      let slug = getRepoSlug();
      copyStringToClipboard(slug);
      showToast(`Repo slug copied!<br>${slug}`);
    });
  });
};

if (document.readyState !== 'loading') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}

