import $ from 'jquery';
import moment from 'moment';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import trLocale from '@fullcalendar/core/locales/tr';
import Hammer from 'hammerjs';
import { LocalStorageService } from '../services/localStorageService';
import { NoData } from '../utils';
import { getBookmarkFilms } from '../requests';

export const currentFilmList = () => {
  const filmList = LocalStorageService.get('filmList');
  const selectedDateHolder = $('.selectedDate-holder');
  const parsedList = JSON.parse(filmList);

  /* VERİLEN TARİHİN ID'LERİNİ DÖNDÜRÜR */
  const getFilmIds = parsedList[selectedDateHolder.val()] || [];
  /*  */

  return { parsedList, getFilmIds };
};

// const

// #region BOOKMARK
export const BookmarkFunc = function () {
  const calendarEl = document.getElementById('bookmark-calendar');
  const bookmarkFilmsContainer = $('.bookmark-films-container');

  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin],
    locale: trLocale,
    timeZone: 'UTC',
    initialView: 'dayGridWeek',
    firstDay: moment().day(),
    dateAlignment: 'week',
    headerToolbar: {
      left: 'prev',
      center: 'title,today',
      right: 'next',
    },
    footerToolbar: {
      start: 'addFilm',
    },
    titleFormat: {
      month: 'short',
      year: 'numeric',
    },
    dayHeaderFormat: {
      day: 'numeric',
      weekday: 'short',
    },
    eventMinHeight: 0,
    viewClassNames: 'bookmark-view',
    dayHeaderClassNames: 'bookmark-date',
    dayCellClassNames: 'grid-cell',
    customButtons: {
      // #region EKLE BUTONU
      addFilm: {
        text: 'Ekle',
        click() {
          const filmId = $('.filmId-holder').val();
          const selectedDate = $('.selectedDate-holder').val();

          /* SEÇİLİ FİLMİ, İLGİLİ TARİHE EKLE */
          LocalStorageService.addToSpecificDate(selectedDate, filmId);
          /*  */

          bookmarkFilmsContainer.empty();

          /* EKLEDİKTEN SONRA GÜNCEL LİSTEYE GÖRE FİLMLERİ GETİR */
          if (currentFilmList().getFilmIds) getBookmarkFilms(currentFilmList().getFilmIds);
          /*  */

          /* FİLM, İLGİLİ TARİHE EKLENİRSE, EKLE BUTONUNU GİZLE */
          if (currentFilmList().getFilmIds.includes(filmId)) $('.fc-addFilm-button').hide();
          /*  */
        },
      },
      // #endregion
    },
    initialEvents() {
      setTimeout(() => {
        const selectedDate = $('.selectedDate-holder');
        const bookmarkDate = $('.bookmark-date');
        const today = $('.bookmark-date.fc-day-today');
        const filmId = $('.filmId-holder').val();

        // #region MODAL AÇILDIĞINDA ÇALIŞANLAR

        /* BUGÜNÜ AKTİF GÜN OLARAK SET EDİYORUZ */
        bookmarkDate.removeClass('active');
        today.addClass('active');

        /* MODAL AÇILDIĞINDA AKTİF GÜNÜ ALIYORUZ */
        selectedDate.val(today.data('date'));
        /* */

        /* SEÇİLİ FİLM, SEÇİLİ TARİHTE MEVCUT İSE EKLE BUTONU GÖSTERİLMEZ */
        if (currentFilmList().getFilmIds.includes(filmId)) $('.fc-addFilm-button').hide();
        else $('.fc-addFilm-button').show();
        /*  */

        if (currentFilmList().getFilmIds.length !== 0)
          getBookmarkFilms(currentFilmList().getFilmIds);
        else bookmarkFilmsContainer.html(NoData('THERE IS NO FILM.'));
        // #endregion

        // #region "BUGÜN" BUTONU CLICK EVENT
        $('.fc-today-button').on('click', () => {
          bookmarkDate.removeClass('active');
          today.addClass('active');

          bookmarkFilmsContainer.empty();
        });
        // #endregion

        // #region TARİH BUTONLARI CLICK EVENT
        const bookmarkDateClickEvent = function () {
          const getThisButtonDate = $(this).data('date');

          selectedDate.val(getThisButtonDate);

          /* HER TARİH SEÇİMİNDE ONUN SECTION'INI TEMİZLİYORUZ */
          bookmarkFilmsContainer.empty();
          /*  */

          /* SEÇİLİ FİLM, SEÇİLİ TARİHTE MEVCUT İSE YA DA SEÇİLEN TARİH GEÇMİŞ İSE EKLE BUTONU GÖSTERİLMEZ */
          if (
            currentFilmList().getFilmIds.includes(filmId) ||
            moment(getThisButtonDate).diff(today, 'days') < 0
          )
            $('.fc-addFilm-button').hide();
          else $('.fc-addFilm-button').show();
          /*  */

          /* SEÇİLİ TARİHTE FİLM VARSA GETİR */
          if (currentFilmList().parsedList[$(this).data('date')]) {
            const ids = currentFilmList().parsedList[$(this).data('date')];

            getBookmarkFilms(ids);
          } else bookmarkFilmsContainer.html(NoData('THERE IS NO FILM.'));
          /*  */

          /* SEÇİLİ TARİH AKTİFLİK TOGGLE'I */
          bookmarkDate.removeClass('active');
          $(this).addClass('active');
          /*  */
        };

        bookmarkDate.on('click', bookmarkDateClickEvent);

        /* MODAL HER KAPANDIĞINDA EVENT'İ KAPATIYORUZ. AKSİ HALDE BİRDEN FAZLA ÇALIŞIYOR */
        const modal = document.querySelector('.bookmark-modal');

        modal.addEventListener('close', () => {
          bookmarkDate.off('click', bookmarkDateClickEvent);
        });
        /*  */

        // #endregion
      }, 0);
    },
  });

  calendar.render();

  const calendarResizer = () => {
    if ($(window).innerWidth() < 686) calendar.setOption('contentHeight', 140);
    if ($(window).innerWidth() > 686) calendar.setOption('contentHeight', 70);
    if ($(window).innerWidth() < 576) calendar.setOption('contentHeight', 125);
  };
  $(window).on('resize', () => {
    calendarResizer();
  });

  const modal = document.querySelector('.bookmark-modal');
  if (modal.open) calendarResizer();

  // #region FOR SWIPE ACTIONS
  const hammertime = new Hammer(calendarEl, {
    domEvents: true,
  });

  hammertime.on('swipeleft', event => {
    const action = { action: event };
    calendar.next(action);
  });

  hammertime.on('swiperight', event => {
    const action = { action: event };
    calendar.prev(action);
  });
  // #endregion
};
// #endregion
