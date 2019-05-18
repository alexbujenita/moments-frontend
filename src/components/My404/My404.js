import React from "react"
import notFound from './hero-blog-404.jpg'

const PageNotFound = () => {
  return (
    <div className="page-not-found">
    <img src={notFound} alt="404 not found" />
    </div>
  )
}

export default PageNotFound