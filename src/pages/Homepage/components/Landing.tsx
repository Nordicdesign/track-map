import { Link } from 'react-router-dom'

import { Routes } from '../../../constants/routes'

export const Landing = () => {
  return (
    <>
      <main className="wrapper landing">
        <section className="home-hero">
          <div>
            <p>
              Reflecting on your driving and taking notes is a great way to
              improve your driving.
            </p>
            <h2>Improve your on-track performance, fast.</h2>
            <p className="mb2">
              <Link to={Routes.SIGN_UP} className="btn signup">
                Sign up free
              </Link>
            </p>
            <p>
              <Link to={Routes.SIGN_IN} className="btn btn-secondary">
                Log in to your account
              </Link>
            </p>
          </div>
        </section>

        <section className="home-what">
          <h3>
            TrackMap* helps you capture track notes in a digital way, so you can
            improve your driving faster.
          </h3>

          <h4>Practice the right things</h4>
          <p>
            Practice makes perfect, right? Except when you’re practicing the
            same mistakes again and again. To avoid mindless practice, use a
            track map after each to annotate how your driving was, what you can
            improve and try differently.
          </p>
          <p>
            So the next time you’re on track, you’re practicing the right
            things.
          </p>

          <h4>Write down all the things</h4>
          <p>
            For each turn you can say whether you had oversteer or understeer,
            and write some thoughts on best way to approach it, braking points,
            etc.
          </p>
          <p>
            You can also say what setup you are using, so it helps when you are
            getting the car ready for the race and your team is trying multiple
            options.
          </p>
          <p>And obviously we can do this separately for each car you want.</p>
        </section>
      </main>

      <footer className="home-footer">
        <p>
          The project is at early stages so expect bare minimum functionality
          and things to not work at all! Use at your own risk, you may lose
          data.
        </p>
        <p>
          If you have suggestions or something is not quite right, please{' '}
          <a
            href="https://opb3adxlfse.typeform.com/to/sdJJgeJf"
            rel="noreferrer"
            target="_blank"
          >
            fill in this form
          </a>{' '}
          and we&apos;ll try to fix it as soon as humanly possible.
        </p>
        <p>
          * TrackMap is just a placeholder, not the real name of this thing, if
          it ever becomes real.
        </p>
      </footer>
    </>
  )
}
