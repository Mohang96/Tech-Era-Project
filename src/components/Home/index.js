import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CourseItem from '../CourseItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {coursesApiStatus: apiStatusConstants.initial, coursesList: []}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({coursesApiStatus: apiStatusConstants.inProgress})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()
    if (response.ok) {
      this.setState({
        coursesApiStatus: apiStatusConstants.success,
        coursesList: data.courses.map(eachCourse => ({
          id: eachCourse.id,
          name: eachCourse.name,
          logoUrl: eachCourse.logo_url,
        })),
      })
    } else {
      this.setState({
        coursesApiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderCoursesInProgressView = () => (
    <div
      data-testid="loader"
      className="courses-in-progress-and-failure-view-container"
    >
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  onClickRetryBtn = () => {
    this.getCourses()
  }

  renderCoursesFailureView = () => (
    <div className="courses-in-progress-and-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-msg">Oops! Something Went Wrong</h1>
      <p className="failure-view-feedback">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={this.onClickRetryBtn}
        className="retry-btn"
      >
        Retry
      </button>
    </div>
  )

  renderCoursesSuccessView = () => {
    const {coursesList} = this.state
    return (
      <div className="courses-success-view-container">
        <h1 className="courses-success-view-heading">Courses</h1>
        <div className="course-items-container">
          {coursesList.map(eachCourse => (
            <CourseItem key={eachCourse.id} courseDetails={eachCourse} />
          ))}
        </div>
      </div>
    )
  }

  renderCourses = () => {
    const {coursesApiStatus} = this.state
    switch (coursesApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderCoursesInProgressView()
      case apiStatusConstants.failure:
        return this.renderCoursesFailureView()
      case apiStatusConstants.success:
        return this.renderCoursesSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-background">
        <Header />
        {this.renderCourses()}
      </div>
    )
  }
}

export default Home
