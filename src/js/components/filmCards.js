export const search = film => `
    <div class="film-card">
                <div class="film-card__head">
                    <button type="button" class="film-card__favorite-btn" data-id="${film.imdbID}">
                        <svg class="icon icon--white" width="28" height="28">
                            <use id="not-added-fav" xlink:href="#favorite"></use>
                            <use id="added-fav" xlink:href="#favorite-fill"></use>
                        </svg>
                    </button>
                    <img
                        src="${film.Poster}"
                        class="film-card__head__img"
                        alt="${film.Title}"
                    />
                    <div class="film-card__head__gradiant"></div>
                </div>
                <div class="film-card__body">
                    <div>
                        <div class="film-card__title">${film.Title} (${film.Year})</div>
                        <div class="film-card__rating">
                            <svg class="icon" width="13" height="13">
                                <use xlink:href="#favorite-fill"></use>
                            </svg>
                            <div class="rating__text">
                                <div class="rating__current">6.8</div>
                                <div class="rating__out_of">/10</div>
                            </div>
                        </div>
                    </div>
                    <div class="film-card__specs">
                        <div class="card__spec">
                            <div class="spec__key">Dil:</div>
                            <div class="spec__value">İngilizce</div>
                        </div>
                        <div class="card__spec card__spec--actors">
                            <div class="spec__key">Oyuncular:</div>
                            <div class="spec__value">
                                <div class="spec__value__text">
                                    Jeff Bridges, Garrett Hedlund, Olivia Wilde |
                                    <button type="button" class="value__text__btn">
                                        Tüm listeyi gör
                                        <svg width="7" height="7">
                                            <use xlink:href="#double-arrow"></use>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="film-card__explain">
                        <div class="film-card__explain__text">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                            volutpat. Ut wisi enim ad ad minim veniam, quis nostrud exerci tation
                        </div>
                        <button type="button" class="film-card__explain__btn">
                            Detaylar
                            <svg width="7" height="7">
                                <use xlink:href="#double-arrow"></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
`;

export const listing = film => {
  let poster = film.Poster;
  if (poster === 'N/A') poster = 'https://placehold.co/160x270?text=No+poster';

  return `
    <div class="film-cards-column">
        <div class="film-card">
            <div class="film-card__head">
                <button type="button" class="film-card__favorite-btn" data-id="${film.imdbID}">
                    <svg class="icon icon--white" width="24" height="24">
                        <use id="not-added-fav" xlink:href="#favorite"></use>
                        <use id="added-fav" xlink:href="#favorite-fill"></use>
                    </svg>
                </button>
                <button type="button" class="film-card__bookmark-btn" data-targetmodal="bookmark-modal" data-id="${film.imdbID}">
                    <svg class="icon icon--white" width="24" height="24">
                        <use xlink:href="#bookmark"></use>
                    </svg>
                </button>
                <div class="film-card__head__gradiant"></div>
                <img src="${poster}" class="film-card__head__img" alt="${film.Title}" />
            </div>
            <div class="film-card__body">
                <div>
                    <div class="film-card__title">${film.Title} (${film.Year})</div>
                    <div class="film-card__rating">
                        <svg class="icon" width="13" height="13">
                            <use xlink:href="#favorite-fill"></use>
                        </svg>
                        <div class="rating__text">
                            <div class="rating__current">6.8</div>
                            <div class="rating__out_of">/10</div>
                        </div>
                    </div>
                </div>
                <div class="film-card__specs">
                    <div class="card__spec">
                        <div class="spec__key">Dil:</div>
                        <div class="spec__value">İngilizce</div>
                    </div>
                    <div class="card__spec card__spec--actors">
                        <div class="spec__key">Oyuncular:</div>
                        <div class="spec__value">
                            <div class="spec__value__text">
                                Jeff Bridges, Garrett Hedlund, Olivia Wilde |
                                <button type="button" class="value__text__btn">
                                    Tüm listeyi gör
                                    <svg width="7" height="7">
                                        <use xlink:href="#double-arrow"></use>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="film-card__explain">
                    <div class="film-card__explain__text">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                        volutpat. Ut wisi enim ad ad minim veniam, quis nostrud exerci tation
                    </div>
                    <button type="button" class="film-card__explain__btn">
                        Detaylar
                        <svg width="7" height="7">
                            <use xlink:href="#double-arrow"></use>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
`;
};

export const myFavorites = film => `
    <div class="film-card">
        <button type="button" class="film-card__remove-btn" data-id="${film.imdbID}">
            <svg class="icon icon--black" width="20" height="20">
                <use xlink:href="#close"></use>
            </svg>
        </button>
        <div class="film-card__head">
            <img
                src="${film.Poster}"
                class="film-card__head__img"
                alt="${film.Title}"
            />
            <div class="film-card__head__gradiant"></div>
        </div>
        <div class="film-card__body">
            <div>
                <div class="film-card__title">${film.Title} (${film.Year})</div>
            </div>
            <div class="film-card__specs">
                <div class="card__spec">
                    <div class="spec__key">Dil:</div>
                    <div class="spec__value">İngilizce</div>
                </div>
                <div class="card__spec card__spec--actors">
                    <div class="spec__key">Oyuncular:</div>
                    <div class="spec__value">
                        <div class="spec__value__text">
                            Jeff Bridges, Garrett Hedlund, Olivia Wilde |
                            <button type="button" class="value__text__btn">
                                Tüm listeyi gör
                                <svg width="7" height="7">
                                    <use xlink:href="#double-arrow"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="film-card__explain">
                <div class="film-card__explain__text">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                    nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                    volutpat. Ut wisi enim ad ad minim veniam, quis nostrud exerci tation
                </div>
                <button type="button" class="film-card__explain__btn">
                    Detaylar
                    <svg width="7" height="7">
                        <use xlink:href="#double-arrow"></use>
                    </svg>
                </button>
            </div>
        </div>
    </div>
`;

export const bookmarks = film => `
    <div class="film-card">
        <button type="button" class="film-card__remove-btn" data-id="${film.imdbID}">
            <svg class="icon icon--black" width="20" height="20">
                <use xlink:href="#close"></use>
            </svg>
        </button>
        <div class="film-card__head">
            <img
                src="${film.Poster}"
                class="film-card__head__img"
                alt="${film.Title}"
            />
        </div>
        <div class="film-card__body">
            <div>
                <div class="film-card__title">${film.Title} (${film.Year})</div>
            </div>
            <div class="film-card__specs">
                <div class="card__spec">
                    <div class="spec__key">Dil:</div>
                    <div class="spec__value">İngilizce</div>
                </div>
                <div class="card__spec card__spec--actors">
                    <div class="spec__key">Oyuncular:</div>
                    <div class="spec__value">
                        <div class="spec__value__text">
                            Jeff Bridges, Garrett Hedlund, Olivia Wilde |
                            <button type="button" class="value__text__btn">
                                Tüm listeyi gör
                                <svg width="7" height="7">
                                    <use xlink:href="#double-arrow"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="film-card__explain">
                <div class="film-card__explain__text">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                    nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                    volutpat. Ut wisi enim ad ad minim veniam, quis nostrud exerci tation
                </div>
                <button type="button" class="film-card__explain__btn">
                    Detaylar
                    <svg width="7" height="7">
                        <use xlink:href="#double-arrow"></use>
                    </svg>
                </button>
            </div>
        </div>
    </div>
`;
