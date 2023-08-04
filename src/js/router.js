import Main from './main';
import NotFound from './pages/404';
import Listing from './pages/listing';
import Search from './pages/search';

const routes = {
  404: './404.html',
  '/': './search.html',
  '/listing': './listing.html',
};

export const handleLocation = async () => {
  const path = window.location.pathname;
  const page = routes[path] || routes[404];

  const html = await fetch(page).then(data => data.text());
  document.getElementById('root').innerHTML = html;

  switch (path) {
    case '/listing':
      Listing();
      break;
    case '/':
      Search();
      break;
    default:
      NotFound();
      break;
  }
  Main();
};

const route = (event, path, queryParam) => {
  event = event || window.event;
  event.preventDefault();
  const queryString = new URLSearchParams(window.location.search);

  if (queryParam) queryString.set(queryParam.name, queryParam.value);

  window.history.pushState(
    {},
    '',
    `${event.target.baseURI}${path}${queryParam ? `?${queryString}` : ''}`,
  );

  handleLocation();
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
