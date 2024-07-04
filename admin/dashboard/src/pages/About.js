import AppLayout from "../components/AppLayout";
const About = () => {
  return (
      <AppLayout>
          <div className="mt-5">
              <h2>About This Application</h2>
              <p>
                  This vocabulary management system is designed to help users track and manage a list of words. It
                  allows adding new words, viewing detailed information about each word, updating existing words, and
                  filtering the word list based on specific criteria.
              </p>
              <p>
                  The application is built using React for the frontend and Bootstrap 5 for styling, ensuring a
                  responsive and user-friendly interface.
              </p>
          </div>
      </AppLayout>
  )
}
export default About
