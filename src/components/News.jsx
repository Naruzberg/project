import React, { useEffect, useState } from 'react';

export const News = () => {
  const [mynews, setMyNews] = useState([]);
  const [category, setCategory] = useState('general');

  const fetchData = async () => {
    let resonse = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=1426a4cbb0a143908b344834d5da8b0f`
    );
    let data = await resonse.json();
    setMyNews(data.articles);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <>
      <h1>See the latest News</h1>
      <div className="btn-group">
        <button className='button' onClick={() => handleCategoryChange('general')}>General</button>
        <button className='button' onClick={() => handleCategoryChange('business')}>Business</button>
        <button className='button' onClick={() => handleCategoryChange('entertainment')}>Entertainment</button>
        <button className='button' onClick={() => handleCategoryChange('health')}>Health</button>
        <button className='button' onClick={() => handleCategoryChange('science')}>Science</button>
        <button className='button' onClick={() => handleCategoryChange('sports')}>Sports</button>
        <button className='button' onClick={() => handleCategoryChange('technology')}>Technology</button>
      </div>
      <div className='mainDiv'>
        {mynews.map((ele) => {
          return (
            <div key={ele.title} className="card" style={{ width: "450px", height: "500px", marginLeft: "2rem" }}>
              <img src={ele.urlToImage || "https://avatars.mds.yandex.net/i?id=bd034476185271f9a0c130f7a60dc379571bd096-11444350-images-thumbs&n=13"} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{ele.author}</h5>
                <p className="card-text">{ele.title}</p>
                <a href={ele.url} target="_blank" className="btn btn-primary">
                  Read More
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default News;