const CountryListItem = ({ country, handleShowOnClick }) => (
  <div>
    <span>{country.name.common}</span>{' '}
    <input
      type="button"
      value="Show"
      onClick={() => handleShowOnClick(country)}
    />
  </div>
)

export default CountryListItem
