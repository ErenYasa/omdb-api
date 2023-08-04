import $ from 'jquery';
import { makeSearch, resetPageNumber, resetPageResult } from '../requests';
import { addedFavFilmControl } from '../common';
import { myFavFilmsModalFunc } from '../components/myFavoritesModal';

export default function Search() {
  $(() => {
    const searchComp = $('.search');
    const searchBarInput = $('.search__bar__input');
    const searchBarBtn = $('.search__bar__btn');
    const searchSuggestions = $('.search__suggestions');
    const searchSuggestionsList = $('.suggestions__list');
    const moreResultBtn = $('.suggestions__btn');
    let filmTitle;
    let trimTitle;

    searchBarInput.trigger('focus');

    // #region SEARCHH INPUT EVENT
    searchBarInput.on('keyup input', function (e) {
      filmTitle = $(this).val();
      trimTitle = filmTitle.trim();

      // #region VALIDATION
      if (trimTitle === '') return;
      // #endregion

      if (trimTitle.length > 1) searchComp.addClass('barFocused');
      else {
        searchSuggestions.removeClass('active');
        searchComp.removeClass('barFocused');
      }

      if (e.key === 'Enter') {
        makeSearch(trimTitle, searchSuggestionsList, searchBarInput, searchSuggestions);
        searchSuggestions.addClass('active');

        addedFavFilmControl();
      }

      // #region SEARCH BTN EVENT
      searchBarBtn.on('click', () => {
        makeSearch(trimTitle, searchSuggestionsList, searchBarInput, searchSuggestions);
        searchSuggestions.addClass('active');

        addedFavFilmControl();
      });
      // #endregion
    });
    // #endregion
    console.log('first');

    // #region DAHA FAZLA SONUÇ GÖSTER BUTON EVENT
    moreResultBtn.on('click', e => {
      /* INFINITE SCROLL İÇİN SON KALINAN PAGE'İ VE FİLMLERİN TUTULDUĞU ARRAYİ SIFIRLIYORUZ */
      resetPageResult();
      resetPageNumber();
      /*  */
      window.route(e, 'listing', { name: 'q', value: trimTitle });
    });
    // #endregion

    // #region MY FAV FILMS MODAL OBSERVER - MODAL AÇILDI MI?
    const myFavFilmsModalObserver = new MutationObserver(mutation => {
      if (mutation[0].type === 'attributes')
        if (mutation[0].target.open === true) myFavFilmsModalFunc();
    });

    const myFavFilmsModal = document.querySelector('.my-favorites-modal');
    myFavFilmsModalObserver.observe(myFavFilmsModal, { attributes: true });
    // #endregion
  });
}
