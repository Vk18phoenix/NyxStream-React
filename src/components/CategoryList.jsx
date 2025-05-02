import React, { useState } from 'react';

const categories = [
  "All", "Indian Premier League", "Music", "Gaming", "Movies", "Coding",
  "Comedy", "Romance", "Website", "Live", "Shreya Ghoshal", "Telugu Cinema",
  "Web series", "Programming", "Recently Uploaded", "Watched", "New to you"
];

function CategoryList() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="category-list">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-button ${activeCategory === category ? 'active' : ''}`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;