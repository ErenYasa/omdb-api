import $ from 'jquery';

export const toastr = (msg, type) => {
  const item = $('.toast-msg');

  if (type) item.addClass(type);

  item.html(msg);
  item.addClass('show');

  setTimeout(() => item.removeClass('show'), 3000);
};
