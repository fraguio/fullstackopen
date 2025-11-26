const Filter = ({ value, handleFilterChange }) => {
  return (
    <div>
      <span>find countries:</span>{' '}
      <input value={value} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter
