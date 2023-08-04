import $ from 'jquery';
import '../scss/index.scss';
import Cookies from 'js-cookie';
import { lockBody } from './common';

export default function Main() {
  $(() => {
    // #region COOKIE BANNER
    const cookieBanner = $('.cookie-banner');
    const cookieBannerCloseBtn = $('.cookie-banner__close-btn');

    if (!Cookies.get('omdbApiCP')) cookieBanner.show();

    cookieBannerCloseBtn.on('click', () => {
      Cookies.set('omdbApiCP', '1', { expires: 60 * 60 * 24 * 365 });
      cookieBanner.hide();
    });
    // #endregion

    // #region MODAL
    $(document).on('click', '[data-targetmodal]', function () {
      const target = $(this).data('targetmodal');
      const targetModal = document.querySelector(`.modal.${target}`);
      const modalCloseBtn = document.querySelector(`.modal.${target} .close-modal`);

      /* If this control is not in place, even if the popup is closed,
      it can remain open, causing multiple "top-layers to appear. */
      if (!targetModal.open) {
        targetModal.showModal();
        lockBody('lock');
      }
      /*  */

      modalCloseBtn.addEventListener('click', () => {
        targetModal.close();
        lockBody();
      });

      // #region FOR OUTSIDE CLICK
      targetModal.addEventListener('click', event => {
        const rect = targetModal.getBoundingClientRect();

        if (
          event.clientY < rect.top ||
          event.clientY > rect.bottom ||
          event.clientX < rect.left ||
          event.clientX > rect.right
        ) {
          targetModal.close();
          lockBody();
        }
      });
      // #endregion
    });
    // #endregion
  });
}
