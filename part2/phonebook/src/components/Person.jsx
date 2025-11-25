const Person = ({ person, handleDeletePerson }) => (
  <div>
    {person.name} {person.number}{' '}
    <button onClick={() => handleDeletePerson(person.id, person.name)}>
      delete
    </button>
  </div>
)

export default Person
