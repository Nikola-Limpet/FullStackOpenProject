const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}
const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0].name} exercises={props.parts[0].ex1} />
      <Part part={props.parts[1].name} exercises={props.parts[1].ex2} />
      <Part part={props.parts[2].name} exercises={props.parts[2].ex3} />
    </>
  )
}
const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].ex1 + props.parts[1].ex2 + props.parts[2].ex3} </p>
  )
}

const App = () => {
  // const course = 'Half Stack application development'
  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14

  const course = {
    title: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', ex1: 10 },
      { name: 'Using props to pass data', ex2: 7 },
      { name: 'State of a component', ex3: 14 }
    ],
  }
  return (
    <div>
      <Header course={course.title} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App