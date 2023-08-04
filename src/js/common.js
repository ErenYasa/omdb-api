import $ from 'jquery';
import { LocalStorageService } from './services/localStorageService';
import { NoData } from './utils/index';
import { getBookmarkFilms, getMyFavoriteFilms } from './requests';
import { toastr } from './components/toastr';
import { currentFilmList } from './components/bookmarkCalendar';

// #region BODY-LOCK
export const lockBody = status => {
  const body = $('body');

  if (status === 'lock') body.addClass('lock');
  else body.removeClass('lock');
};
// #endregion

// #region ADD OR REMOVE FROM FAVORITES
export const favoriteFunc = function () {
  const addFavBtn = $('.film-card__favorite-btn');

  addFavBtn.on('click', function () {
    const favList = LocalStorageService.get('favList');

    const _this = $(this);
    const filmId = _this.data('id');
    const isActive = _this.hasClass('active');

    _this.toggleClass('active');
    _this.addClass('disabled');

    if (favList && isActive) {
      favList.forEach(id => {
        if (id === filmId) {
          LocalStorageService.removeFromArray('favList', filmId);
          toastr('Successfully removed.');
          setTimeout(() => _this.removeClass('disabled'), 3000);
        }
      });
    } else {
      LocalStorageService.setAsArray('favList', filmId);
      toastr('Successfully added.');
      setTimeout(() => _this.removeClass('disabled'), 3000);
    }
  });
};
// #endregion

// #region ADDED FAVORITE FILM CONTROL
export const addedFavFilmControl = () => {
  const addFavBtn = $('.film-card__favorite-btn');

  addFavBtn.each(function () {
    const favList = LocalStorageService.get('favList');
    const button = $(this);
    const filmId = button.data('id');

    if (favList) {
      favList.forEach(id => {
        if (id === filmId) button.addClass('active');
      });
    }
  });
};
// #endregion

// #region REMOVE FILM BTN IN MY FAVORITES MODAL
export const favFilmRemoveBtnControl = () => {
  const myFavoriteModal = $('.my-favorites-modal .modal-body__content');
  const removeBtnInMyFavsModal = $('.my-favorites-modal .film-card__remove-btn');

  removeBtnInMyFavsModal.on('click', function () {
    const _this = $(this);
    const filmId = _this.data('id');

    LocalStorageService.removeFromArray('favList', filmId);

    const favList = LocalStorageService.get('favList');
    if (favList.length === 0) {
      myFavoriteModal.html(NoData('THERE IS NO FAVORITE FILMS.'));
      return;
    }

    myFavoriteModal.empty();

    [favList].map(id => {
      getMyFavoriteFilms(id, myFavoriteModal);
    });

    toastr('Successfully removed.');
    setTimeout(() => _this.removeClass('disabled'), 3000);
  });
};
// #endregion

// #region BOOKMARK BTN
export const bookmarkBtnFunc = () => {
  const filmIdHolder = $('.filmId-holder');
  const bookmarkBtn = $('.film-card__bookmark-btn');

  bookmarkBtn.on('click', function () {
    filmIdHolder.val($(this).data('id'));
  });
};
// #endregion

// #region BOOKMARKED FILM REMOVE BTN
export const removeBookmarkedFilm = () => {
  const bookmarkFilmsContainer = $('.bookmark-films-container');
  const removeBtn = $('.film-card__remove-btn');
  const selectedDate = $('.selectedDate-holder').val();

  removeBtn.on('click', async function () {
    const removeFilmId = $(this).data('id');
    const filmId = $('.filmId-holder').val();

    LocalStorageService.removeToSpecificDate(selectedDate, removeFilmId);
    await getBookmarkFilms(currentFilmList().getFilmIds);

    if (currentFilmList().getFilmIds.length === 0)
      bookmarkFilmsContainer.html(NoData('THERE IS NO FILM.'));

    /* SEÇİLİ FİLM ID'Sİ İLE SİLİNEN FİLM ID'Sİ AYNIYSA EKLE BUTONUNU GÖSTER */
    if (removeFilmId === filmId) $('.fc-addFilm-button').show();
    /*  */
  });
};
// #endregion
