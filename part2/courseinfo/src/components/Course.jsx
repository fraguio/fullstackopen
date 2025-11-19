const Header = ({ course }) => <h2>{course.name}</h2>

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
)

const Content = ({ parts }) => (
  <>
    {parts.map(part => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </>
)

const Total = ({ parts }) => (
  <p>
    Number of exercises{' '}
    {parts.reduce((accum, part) => accum + part.exercises, 0)}
  </p>
)

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course
