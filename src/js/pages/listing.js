import $ from 'jquery';

export default function Listing() {
    const queryString = new URLSearchParams(window.location.search);

    /* #region SEARCH RESULT TEXT */
    const searchResult = $('.header__search__result');
    searchResult.text(queryString.get('q'));
    /* #endregion */

}
