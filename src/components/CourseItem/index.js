import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails
  return (
    <Link to={`/courses/${id}`} className="course-item-link">
      <div className="course-item">
        <img src={logoUrl} alt={name} className="course-item-logo" />
        <h1 className="course-item-name">{name}</h1>
      </div>
    </Link>
  )
}

export default CourseItem
