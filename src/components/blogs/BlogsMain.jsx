import React from 'react'
import { Link } from 'react-router-dom'


function BlogsMain() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-[#e3f0ff] to-[#f8faff] py-12">
      <h1 className="text-3xl font-bold text-[#1565d8] mb-6 text-center">Coming soon</h1>
      <Link
        to="/"
        className="inline-block px-6 py-2 rounded-lg bg-[#1976d2] text-white font-semibold shadow hover:bg-[#1565d8] transition-colors"
      >
        &larr; Back to Home
      </Link>
    </div>
  )
}

export default BlogsMain
