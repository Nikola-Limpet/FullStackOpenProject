import { Header, Content, Part } from "./App"

const Course = ({ course }) => {
  console.log(course)
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />

    </>
  )
}

export default Course