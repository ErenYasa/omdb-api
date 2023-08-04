import $ from 'jquery';
import { config } from '../config';

export function GET(query, searchType = 's', page = 1) {
  const baseUrl = `http://www.omdbapi.com/?${searchType}=${query}&type=movie&apikey=${config.API_KEY}&page=${page}`;

  return $.ajax({
    url: baseUrl,
    type: 'GET',
    dataType: 'json',
  })
    .done(data => data)
    .fail((xhr, status, error) => xhr);
}
