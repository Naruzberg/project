import React, { useEffect, useState } from 'react';
import styled from './News.scss';

import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
        <Button onClick={() => handleCategoryChange('general')}>General</Button>
        <Button onClick={() => handleCategoryChange('business')}>Business</Button>
        <Button onClick={() => handleCategoryChange('entertainment')}>Entertainment</Button>
        <Button onClick={() => handleCategoryChange('health')}>Health</Button>
        <Button onClick={() => handleCategoryChange('science')}>Science</Button>
        <Button onClick={() => handleCategoryChange('sports')}>Sports</Button>
        <Button onClick={() => handleCategoryChange('technology')}>Technology</Button>
      </div>
      <div className='mainDiv'>

        {mynews.map((ele) => {
          return (
            <Card key={ele.title} className="card" style={{ width: "450px", height: "500px", marginLeft: "2rem" }}>
              <Card.Img src={ele.urlToImage || "https://avatars.mds.yandex.net/i?id=bd034476185271f9a0c130f7a60dc379571bd096-11444350-images-thumbs&n=13"}  alt="..." />
              <Card.Body className="card-body">
                <Card.Title >{ele.author}</Card.Title>
                <Card.Text >{ele.title}</Card.Text>
                <Button href={ele.url} target="_blank" className="btn btn-primary">
                  Read More
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default News;