const routes = {
    404: './404.html',
    '/': './search.html',
    '/listing': './listing.html',
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const page = routes[path] || routes[404];
    const html = await fetch(page).then(data => data.text());
    document.getElementById('root').innerHTML = html;
};

const route = event => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, '', event.target.href);
    handleLocation();
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
