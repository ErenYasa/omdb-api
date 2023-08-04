import $ from 'jquery';
import { GET } from '../services/apiService';
import { LoaderDom, NoData } from '../utils';
import * as filmCards from '../components/filmCards';
import {
  addedFavFilmControl,
  bookmarkBtnFunc,
  favFilmRemoveBtnControl,
  favoriteFunc,
  removeBookmarkedFilm,
} from '../common';

export async function makeSearch(filmTitle, container, searchBarInput, searchSuggestions) {
  const searchSuggestionsList = container;

  // #region
  searchSuggestionsList.empty();
  // #endreigon

  try {
    searchSuggestionsList.append(LoaderDom().loader);

    const result = await GET(filmTitle);
    const films = result.Search;

    // #region EĞER ARANAN TITLE YOKSA
    if (!films) {
      searchBarInput.trigger('blur');
      searchSuggestionsList.html(NoData('NO SEARCH RESULTS FOUND.'));
      return;
    }
    // #endregion

    // #region INPUT'U SIFIRLIYORUZ.
    filmTitle = '';
    // #endregion

    let DOM = '';
    films.map((film, index) => {
      // #region SADECE İKİ FİLM GÖSTER
      if (index > 1) return;
      // #endregion

      DOM += filmCards.search(film);
      searchSuggestionsList.html(DOM);
    });

    // #region KARTLAR GELDİKTEN SONRA SUGGEST LISTI AÇIYORUZ
    searchSuggestions.addClass('active');
    // #endregion

    /* FAVORILERE EKLİ OLAN FİLMLERİ KONTROL & FAVORİLERE EKLE ÇIKAR */
    favoriteFunc();
    addedFavFilmControl();
    /*  */
  } catch (error) {
    searchSuggestionsList.html(NoData('SOMETHING WENT WRONG.'));
    console.error(error);
  } finally {
    searchSuggestionsList.find(LoaderDom().class).remove();
  }
}

export async function getMyFavoriteFilms(filmIds, container) {
  const myFavoriteModal = container;

  myFavoriteModal.append(LoaderDom().loader);

  try {
    const res = filmIds.map(async id => GET(id, 'i'));
    const results = await Promise.all(res);

    let DOM = '';
    results.reverse().map(r => {
      DOM += filmCards.myFavorites(r);
    });

    myFavoriteModal.empty();
    myFavoriteModal.append(DOM);

    /* FAVORİLER MODALI İÇİN FİLM SİLME BUTONU */
    favFilmRemoveBtnControl();
    /*  */
  } catch (error) {
    myFavoriteModal.html(NoData('SOMETHING WENT WRONG.'));
    console.error(error);
  } finally {
    myFavoriteModal.find(LoaderDom().class).remove();
  }
}

// #region INFINITE SCROLL İÇİN SON KALINAN SAYFA NUMARASINI & SON KALAN FİLM DATALARINI TEMİZLER
let result = [];
export const resetPageResult = () => {
  result = [];
};

let page = 1;
export const resetPageNumber = () => {
  page = 1;
};
// #endregion

export async function getListingFilms(queryString, container) {
  const cardsContainer = container;
  const totalCount = $('.header__total__count');

  cardsContainer.append(LoaderDom().loader);
  try {
    const request = await GET(queryString, 's', page);

    if (Math.ceil(request.totalResults / 10) >= page) {
      result.push(request.Search);

      totalCount.html(`${request.totalResults} film bulundu`);

      page += 1;
    }

    if (request.totalResults < 1) {
      cardsContainer.html(NoData('NO SEARCH RESULTS FOUND.'));
      return;
    }

    const searchData = result.flat();

    let DOM = '';
    searchData.map(film => {
      DOM += filmCards.listing(film);
    });
    cardsContainer.html(DOM);

    /* FAVORILERE EKLİ OLAN FİLMLERİ KONTROL & FAVORİLERE EKLE ÇIKAR & BOOKARMAK BUTTON */
    favoriteFunc();
    addedFavFilmControl();
    bookmarkBtnFunc();
    /*  */
  } catch (error) {
    cardsContainer.html(NoData('SOMETHING WENT WRONG.'));
    console.error(error);
  } finally {
    cardsContainer.find(LoaderDom().class).remove();
  }
}

export const getBookmarkFilms = async ids => {
  const bookmarkFilmsContainer = $('.bookmark-films-container');

  bookmarkFilmsContainer.append(LoaderDom().loader);

  const res = ids.map(async id => GET(id, 'i'));
  const results = await Promise.all(res);

  let DOM = '';
  results.reverse().map(r => {
    DOM += filmCards.bookmarks(r);
  });

  try {
    bookmarkFilmsContainer.empty();
    bookmarkFilmsContainer.append(DOM);

    /* BOOKMARK MODAL İÇİN FİLM SİLME BUTONU */
    removeBookmarkedFilm();
    /*  */
  } catch (error) {
    bookmarkFilmsContainer.html(NoData('SOMETHING WENT WRONG.'));
    console.error(error);
  } finally {
    bookmarkFilmsContainer.find('.loader-spinner').remove();
  }
};
