import $ from 'jquery';

export default function Search() {
    $(() => {
        const searchComp = $('.search');
        const searchBarInput = $('.search__bar__input');
        const searchBarBtn = $('.search__bar__btn');
        const searchSuggestions = $('.search__suggestions');
        const myFavoritesBtn = $('.my-favorite-btn');
        const moreResultBtn = $('.suggestions__btn');

        myFavoritesBtn.hide();

        function makeSearch() {
            console.log('make search');
        }

        searchBarBtn.on('click', () => {
            makeSearch();
        });

        moreResultBtn.on('click', e => {
            window.route(e, 'listing', { name: 'q', value: 'the tron' });
        });

        searchBarInput.on('keyup', function (e) {
            if ($(this).val().length > 0) searchComp.addClass('barFocused');
            else {
                searchSuggestions.hide();
                myFavoritesBtn.show();
                searchComp.removeClass('barFocused');
            }

            if (e.key === 'Enter') makeSearch();
        });
    });
}
