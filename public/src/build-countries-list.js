/**
 * html structure
 *
 * @example
 * <ul class="countries-list">
 *  <li class="country-item">
 *    <div class="country-item-block">
 *      <span class="country-checkbox"><input type="checkbox"></span>
 *      <span class="country-nation">Country nation</span>
 *      <span class="country-status">not visited</span>
 *      <span class="Visit_date">Visit_date</span>
 *    </div>
 *  </li>
 * </ul>
 */

// This is an IIFE (Immediately Invoked Function Expression).
// What it does is in the name.
import { getCountries } from './countries.service.js';

const buildCountriesList = async () => {
  try {
    console.log('Starting to fetch countries...');
    const countries = await getCountries();
    console.log('Fetched countries:', countries);

    if (countries.length) {
      const div = document.getElementById('countries');
      const loadingDiv = div.childNodes[1];
      console.log('Removing loading div:', loadingDiv);

      const ul = document.createElement('ul');

      div.replaceChild(ul, loadingDiv); // <- order is important here!

      countries.forEach((country) => {
        console.log('Processing country:', country);

        const li = document.createElement('li');
        li.className = 'country-item';
        const block = document.createElement('div');
        block.className = 'country-item-block';

        const checkboxSpan = document.createElement('span');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkboxSpan.className = 'country-checkbox';
        checkboxSpan.appendChild(checkbox);

        const nationSpan = document.createElement('span');
        nationSpan.className = 'country-name';
        nationSpan.innerText = country.nation;

        const statusSpan = document.createElement('span');
        statusSpan.className = 'country-status';
        statusSpan.innerText = country.status;

        const visitDateSpan = document.createElement('span');
        visitDateSpan.className = 'country-visit-date';
        visitDateSpan.innerText = country.Visit_date;

        block.appendChild(checkboxSpan);
        block.appendChild(nationSpan);
        block.appendChild(statusSpan);
        block.appendChild(visitDateSpan);

        li.appendChild(block);
        ul.appendChild(li);
      });
    } else {
      console.log('No countries found');
      const div = document.getElementById('countries');
      div.innerHTML = '<div>No countries found.</div>';
    }
  } catch (error) {
    console.error('Error fetching countries:', error);
    const div = document.getElementById('countries');
    div.innerHTML = '<div>Error loading countries.</div>';
  }
};

export default buildCountriesList;
