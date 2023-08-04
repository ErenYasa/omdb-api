import $ from 'jquery';
import { LoaderDom, goIndexPage } from '../utils';
import { getListingFilms } from '../requests';
import { BookmarkFunc } from '../components/bookmarkCalendar';

export default function Listing() {
  $(() => {
    const queryString = new URLSearchParams(window.location.search).get('q');
    const cardsContainer = $('.film-cards-container');

    // #region IF THERE IS NO SEARCH PARAM, REDIRECT TO SEARCH PAGE
    if (!queryString) {
      cardsContainer.append(LoaderDom().loader);
      goIndexPage();
      return;
    }
    // #endregion

    // #region YENİ BİR ARAMA YAP BTN EVENT
    const makeNewSearchBtn = $('.header__button');
    makeNewSearchBtn.on('click', () => {
      goIndexPage();
    });
    // #endregion

    // #region SEARCH RESULT TEXT
    const searchResult = $('.header__search__result');
    searchResult.text(`"${queryString}" için sonuçlar`);
    // #endregion

    // #region SAYFA AÇILDIĞINDA FİLMLERİ ÇEKİYORUZ
    getListingFilms(queryString, cardsContainer);
    // #endregion

    // #region INFINITE SCROLL
    let flag = true;

    window.onscroll = function () {
      if (flag && $(window).scrollTop() + $(window).height() >= cardsContainer.height()) {
        flag = false;

        getListingFilms(queryString, cardsContainer);

        setTimeout(() => {
          flag = true;
        }, 500);
      }
    };
    // #endregion

    // #region BOOKMARK MODAL OBSERVER - MODAL AÇILDI MI?
    const bookmarkModalObserver = new MutationObserver(mutation => {
      if (mutation[0].type === 'attributes') if (mutation[0].target.open === true) BookmarkFunc();
    });

    const bookmarkModal = document.querySelector('.bookmark-modal');
    bookmarkModalObserver.observe(bookmarkModal, { attributes: true });
    // #endregion
  });
}
