import { Header, Content, Total } from "./App"

const Course = ({ course }) => {
  // console.log(course)
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course