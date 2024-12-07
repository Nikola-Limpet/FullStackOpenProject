import Course from "./Course"

export const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}
export const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}
export const Content = ({ parts }) => {
  return (
    <>
      <Part part={parts[0].name} exercises={parts[0].exercises} />
      <Part part={parts[1].name} exercises={parts[1].exercises} />
      <Part part={parts[2].name} exercises={parts[2].exercises} />
    </>
  )
}
// export const Total = (props) => {
//   return (
//     <p>Number of exercises {props.parts[0].ex1 + props.parts[1].ex2 + props.parts[2].ex3} </p>
//   )
// }

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App