import Cookies from 'js-cookie';
import '../scss/index.scss';
import $ from 'jquery';

export default function Common() {
    $(() => {
        /* #region COOKIE BANNER */
        const cookieBanner = $('.cookie-banner');
        const cookieBannerCloseBtn = $('.cookie-banner__close-btn');

        if (!Cookies.get('omdbApiCP')) cookieBanner.show();

        cookieBannerCloseBtn.on('click', () => {
            Cookies.set('omdbApiCP', '1', { expires: 60 * 60 * 24 * 365 });
            cookieBanner.hide();
        });
        /* #endregion */

        /* #region MODAL */
        $(document).on('click', '[data-targetmodal]', function () {
            const target = $(this).data('targetmodal');
            const targetModal = document.querySelector(`.modal.${target}`);
            const modalCloseBtn = document.querySelector(`.modal.${target} .close-modal`);

            targetModal.showModal();

            modalCloseBtn.addEventListener('click', () => targetModal.close());

            /* FOR OUTSIDE CLICK */
            targetModal.addEventListener('click', event => {
                const rect = targetModal.getBoundingClientRect();

                if (
                    event.clientY < rect.top ||
                    event.clientY > rect.bottom ||
                    event.clientX < rect.left ||
                    event.clientX > rect.right
                )
                    targetModal.close();
            });
        });
        /* #endregion */

        /* #region FAV BUTTON */
        const favBtn = $('.film-card__favorite-btn');

        favBtn.on('click', function () {
            // const filmId = $(this).data("id");
            $(this).toggleClass('active');
        });
        /* #endregion */
    });
}
