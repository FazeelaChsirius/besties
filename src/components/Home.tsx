interface CodeInterface {
  code: number
}
interface StudentInterface extends CodeInterface {
  name: string;
  roll: number;
  subject: string
}

const Home = () => {
  const student: StudentInterface = {
    name: "saurav",
    roll: 123,
    subject: "maths",
    code: 1200
  }

  console.log(student)
  
  return (
    <div>Home
      <h1>helo</h1>
    </div>
  )
}

export default Home