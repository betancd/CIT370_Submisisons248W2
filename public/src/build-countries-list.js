

class CountryList {
  countries = [];

  constructor() {}

  createCountryListParent = () => {
    const ul = document.createElement('ul');
    ul.id = 'countries-list';
    ul.className = 'list-group list-group-flush checked-list-box';
    return ul;
  };

  _deleteEventHandler = (countryId) => async () => {
    if (countryId) {
      const res = await deleteCountry(countryId);

      if (res !== null) {
        this.countries = this.countries.filter((country) => country.country_id !== countryId);
        const country = document.getElementById(`country-${countryId}`);
        country.remove();

        if (!this.countries.length) {
          const div = document.getElementById('countries');
          const loadingDiv = div.childNodes[1];
          const errDiv = this.generateErrorMsg('List some new countries you have visited!');
          div.replaceChild(errDiv, loadingDiv);
        }
      }
    }
  };

  formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  buildCountryListRowItem = (country) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.id = `country-${country.Countryid}`; // Ensure the correct property name
    listGroupItem.className = 'list-group-item';

    const deleteBtn = document.createElement('button');
    const deleteBtnTxt = document.createTextNode('X');
    deleteBtn.className = 'btn btn-secondary';
    deleteBtn.addEventListener('click', this._deleteEventHandler(country.Countryid));
    deleteBtn.appendChild(deleteBtnTxt);

    const countryNationSpan = document.createElement('span');
    const countryNation = document.createTextNode(country.nation); // Correct property name
    countryNationSpan.appendChild(countryNation);

    const countryStatusSpan = document.createElement('span');
    const countryStatus = document.createTextNode(country.status);
    countryStatusSpan.append(countryStatus);

    const countryDateSpan = document.createElement('span');
    const countryDate = document.createTextNode(this.formatDate(country.Visit_date));
    countryDateSpan.append(countryDate);

    listGroupItem.append(deleteBtn);
    listGroupItem.append(countryNationSpan);
    listGroupItem.append(countryStatusSpan);
    listGroupItem.append(countryDateSpan);

    return listGroupItem;
  };

  buildCountriesList = (mount, countries) => {
    countries.forEach((country) => {
      const listGroupRowItem = this.buildCountryListRowItem(country);
      mount.append(listGroupRowItem);
    });
  };

  generateErrorMsg = (msg) => {
    const div = document.createElement('div');
    const text = document.createTextNode(msg);
    div.id = 'user-message';
    div.className = 'center';
    div.appendChild(text);
    return div;
  };

  generateCountries = async () => {
    const res = await getCountries();
    const div = document.getElementById('countries');
    const loadingDiv = div.childNodes[1];

    if (res.length) {
      this.countries = res;
      const countriesDiv = this.createCountryListParent();
      this.buildCountriesList(countriesDiv, res);
      div.replaceChild(countriesDiv, loadingDiv);
    } else {
      const errDiv = this.generateErrorMsg(res.msg || 'An error occurred');
      div.replaceChild(errDiv, loadingDiv);
    }
  };
}

const inst = new CountryList();

(async () => {
  inst.generateCountries();
})();
