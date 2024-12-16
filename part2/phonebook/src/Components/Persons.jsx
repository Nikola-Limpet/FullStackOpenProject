import DeleteButton from "./DeleteButton"

const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <>
      {
        personsToShow.map((person) => {
          return (
            <ul key={person.id}>
              <li>
                {person.name} {person.number}
                <span>
                  <DeleteButton onClick={() => handleDelete(person.id)} />
                </span>
              </li>
            </ul>
          )
        })
      }
    </>
  )
}

export default Persons