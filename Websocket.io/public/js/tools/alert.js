alertMsg = (text, type, cb) => {
  const alertId =  new Date().getTime();
  if (!$('#alertCon').length) $('body').prepend('<div style="position:fixed;top:20px;right:20px;z-index:100" id="alertCon">');
  const alertDom = `<div id="${alertId}" class="alert alert-${type || 'primary'} fade show" style="width: 200px;" role="alert">${text}</div>`;
  $('#alertCon').append(alertDom);
  setTimeout(() => {
    $(`#${alertId}`).fadeOut();
    if (!$('.alert').length) $('#alertCon').remove();
    cb && cb();
  }, 5000);
};