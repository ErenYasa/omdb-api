import { handleLocation } from '../router';

// #region LOADER DOM
export const LoaderDom = () => {
  const elem = `
    <div class="loader-spinner">
        <div class="loader-spinner__dots-wrapper">
            <span class="dot-spinner"></span>
        </div>
    </div>`;

  return { loader: elem, class: '.loader-spinner' };
};
// #endregion

// #region NO-DATA
export const NoData = text => `<div class="no-data">
        <p class="no-data-text">${text}</p>
        <button type="button" class="no-data__btn">
            Geri dön
        </button>
    </div>`;
// #endregion

// #region MAKE NEW SEARCH BTN
export const goIndexPage = () => {
  window.history.replaceState(null, null, '/');
  handleLocation();
};
// #endregion
