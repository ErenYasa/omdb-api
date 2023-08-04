import $ from 'jquery';
import { goIndexPage } from '../utils';

export default function NotFound() {
  $(() => {
    // #region ANA SAYFAYA DÖN BTN EVENT
    const goHomePageBtn = $('.not-found-page__button');

    goHomePageBtn.on('click', () => {
      goIndexPage();
    });
    // #endregion
  });
}
