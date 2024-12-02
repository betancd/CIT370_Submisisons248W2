const COUNTRIES_API = `${BASE_API_URL}/countries`; // http://localhost:3000/api/countries

const getCountries = () => _get(COUNTRIES_API, OPTIONS_WITH_AUTH);

const addCountry = (formData) =>
  _post(COUNTRIES_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

const deleteCountry = (countryId) =>
  _delete(`${COUNTRIES_API}/${countryId}`, OPTIONS_WITH_AUTH);