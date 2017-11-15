function randPassword(length, includeSpecial) {
  let pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  if (includeSpecial) {
    pwdChars += '°^!"§$%&/()=?`´\}][{²³€|<>-.,;:*+_';
  }
  let randPassword = Array(length).fill(pwdChars).map(function(x) {
    return x[Math.floor(Math.random() * x.length)]
  }).join('');
  return randPassword;
}

function getParams() {
  return {
    length: parseInt(document.getElementById('length').value),
    special: document.getElementById('special').checked
  }
}

function loadOptions() {
  return browser.storage.local.get({
    length: 14,
    special: true
  });
}

function saveOptions(options) {
  return browser.storage.local.set(options);
}

document.getElementById('new').addEventListener('click', (ev) => {
  ev.preventDefault();
  var params = getParams();
  document.getElementById('pw').value = randPassword(params.length, params.special);
  saveOptions(params);
});

document.getElementById('copy').addEventListener('click', (ev) => {
  ev.preventDefault();
  var copyText = document.getElementById('pw');
  copyText.select();
  document.execCommand('copy');
});

loadOptions().then((options) => {
  document.getElementById('length').value = options.length;
  document.getElementById('special').checked = options.special;
  document.getElementById('pw').value = randPassword(getParams().length, getParams().special);
});