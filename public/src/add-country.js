

const doAddCountry = async (e) => {
  e.preventDefault();

  const countryInput = document.getElementById('formInputCountryNation');
  const country_nation = countryInput.value;
  const statusSelect = document.getElementById('formSelectStatus');
  const options = statusSelect.options;
  const selectedIndex = statusSelect.selectedIndex;
  const status = options[selectedIndex].text;
  const visitDateInput = document.getElementById('formInputVisitDate');
  const Visit_date = visitDateInput.value;

  if (!country_nation) {
    alert('Please enter a country name.');
    return;
  }

  const res = await addCountry({ country_nation, status, Visit_date });

  if (res !== null) {
    await inst.generateCountries(); // Refresh the list after adding
  }
  countryInput.value = '';
  visitDateInput.value = '';
};
