const Persons = ({ personsToShow }) => {
  return (
    <>
      {
        personsToShow.map((person) => {
          return (
            <ul key={person.id}>
              <li>{person.name} {person.number}</li>
            </ul>
          )
        })
      }
    </>
  )
}

export default Persons