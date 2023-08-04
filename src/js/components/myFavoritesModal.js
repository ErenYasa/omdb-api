import $ from 'jquery';
import { LocalStorageService } from '../services/localStorageService';
import { NoData } from '../utils';
import { getMyFavoriteFilms } from '../requests';

export const myFavFilmsModalFunc = () => {
  const myFavoriteModal = $('.my-favorites-modal .modal-body__content');

  const favList = LocalStorageService.get('favList');

  /* STORAGE'DA İLGİLİ KEY VAR ANCAK İÇERİĞİ BOŞSA */
  if (favList.length === 0) myFavoriteModal.html(NoData('THERE IS NO FAVORITE FILMS.'));
  else {
    // #region MODAL HER AÇILDIĞINDA İÇERİĞİ TEMİZLİYORUZ
    myFavoriteModal.empty();
    // #endregion

    // #region STORAGE'DA İLGİLİ KEY YOKSA
    if (!favList) {
      myFavoriteModal.html(NoData('THERE IS NO FAVORITE FILMS.'));
      return;
    }
    // #endregion

    // FAVORI FİLMLERİ GETİR
    getMyFavoriteFilms(favList, myFavoriteModal);
  }
};
