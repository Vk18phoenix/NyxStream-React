// src/components/CategoryList.jsx - CORRECTED
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const categories = [
  "All", "Indian Premier League", "Music", "Gaming", "Movies", "Coding",
  "Comedy", "Romance", "Website", "Live", "Shreya Ghoshal", "Telugu Cinema",
  "Web series", "Programming", "Recently Uploaded", "Watched", "New to you"
];

// 1. It now accepts props from HomePage
function CategoryList({ activeCategory, onCategorySelect }) {
  return (
    <div className="category-list">
      {categories.map((category) => {
        // We will make some of these links and others buttons
        const isPageLink = ["Indian Premier League", "Music", "Comedy", "Cricket"].includes(category);
        const urlFriendlyName = category.replace(/ /g, '-');

        if (isPageLink) {
          // These will navigate to a new page
          return (
            <Link
              key={category}
              to={`/category/${urlFriendlyName}`}
              // We check if the current path matches the category to set it as active
              className={`category-button ${window.location.pathname.includes(urlFriendlyName) ? 'active' : ''}`}
            >
              {category}
            </Link>
          );
        } else {
          // These will filter the homepage
          return (
            <button
              key={category}
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </button>
          );
        }
      })}
    </div>
  );
}

export default CategoryList;