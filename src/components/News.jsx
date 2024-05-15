import React, { useEffect, useState } from 'react';
import styles from './News.module.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';

export const News = () => {
  const [mynews, setMyNews] = useState([]);
  const [category, setCategory] = useState('general');

  const fetchData = async () => {
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=1426a4cbb0a143908b344834d5da8b0f`
    );
    let data = await response.json();
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
      <div className={styles.btnGroup}>
        <Button onClick={() => handleCategoryChange('general')}>General</Button>
        <Button onClick={() => handleCategoryChange('business')}>Business</Button>
        <Button onClick={() => handleCategoryChange('entertainment')}>Entertainment</Button>
        <Button onClick={() => handleCategoryChange('health')}>Health</Button>
        <Button onClick={() => handleCategoryChange('science')}>Science</Button>
        <Button onClick={() => handleCategoryChange('sports')}>Sports</Button>
        <Button onClick={() => handleCategoryChange('technology')}>Technology</Button>
      </div>
      <div className={styles.mainDiv}>
        {mynews.map((ele, index) => {
          if (index % 3 === 0) {
            return (
              <Row key={`row-${ele.title}`}>
                {mynews.slice(index, index + 3).map((ele) => (
                  <Col key={ele.title} className="mb-4 col">
                    <Card>
                      <Card.Img src={ele.urlToImage || "https://avatars.mds.yandex.net/i?id=bd034476185271f9a0c130f7a60dc379571bd096-11444350-images-thumbs&n=13"} alt="..." />
                      <Card.Body>
                        <div>
                          <strong>Author:</strong> {ele.author}
                        </div>
                        <Card.Title>{ele.title}</Card.Title>
                        <Button href={ele.url} target="_blank">
                          Read More
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};
export default News;