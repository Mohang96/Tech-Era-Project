import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class CourseItemDetails extends Component {
  state = {
    courseDetailsApiStatus: apiStatusConstants.initial,
    courseDetails: {},
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({courseDetailsApiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {courseId} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${courseId}`)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        courseDetailsApiStatus: apiStatusConstants.success,
        courseDetails: {
          id: data.course_details.id,
          name: data.course_details.name,
          imageUrl: data.course_details.image_url,
          description: data.course_details.description,
        },
      })
    } else {
      this.setState({
        courseDetailsApiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderCourseDetailsInProgressView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  onClickRetryBtn = () => {
    this.getCourseDetails()
  }

  renderCourseDetailsFailureView = () => (
    <div className="course-details-failure-view-container">
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

  renderCourseDetailsSuccessView = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails
    return (
      <div className="course-details-success-view-container">
        <div className="course-details-container">
          <img src={imageUrl} alt={name} className="course-image" />
          <div className="course-description-container">
            <h1 className="course-heading">{name}</h1>
            <p className="course-description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderCourseDetails = () => {
    const {courseDetailsApiStatus} = this.state
    switch (courseDetailsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderCourseDetailsInProgressView()
      case apiStatusConstants.failure:
        return this.renderCourseDetailsFailureView()
      case apiStatusConstants.success:
        return this.renderCourseDetailsSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="course-item-details-background">
        <Header />
        <div className="course-details-background">
          {this.renderCourseDetails()}
        </div>
      </div>
    )
  }
}

export default CourseItemDetails
