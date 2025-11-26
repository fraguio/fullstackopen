const Filter = ({ value, handleFilterChange }) => {
  return (
    <div>
      find countries: <input value={value} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter
