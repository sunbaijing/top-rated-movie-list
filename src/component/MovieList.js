import React from 'react';
import { Row, Col, Image, Button, Collapse, Spinner } from 'react-bootstrap';
import movie_icon from '../image/movie_icon.png'
import './MovieList.css';
import SortButton from "./Sortbutton.js";

const MovieList = props => {
  const {
    items, setItems, totalPages, pagination, setPagination,
    addLike, likeList, addBlock, blockList, isLoaded,
  } = props

  const handlePrev = () => {
    setPagination({
      page: pagination.page - 1,
      prev: pagination.page - 1 !== 1 ? false : true
    })
  }

  const handleNext = () => {
    setPagination({
      page: pagination.page + 1,
      next: pagination.page + 1 !== totalPages ? false : true
    })
  }

  const handleCollapse = id => {
    const newItems = [...items].map(item => {
      if (item.id === id) {
        item.collapse = !item.collapse
      }
      return item
    })
    setItems(newItems)
  }

  let blockId = new Set(blockList.map(item => { return item.id }))
  let filterItems = items.filter(item => !blockId.has(item.id))

  return (
    <div className='movie-list'>
      <h2 className="page-header">Top Rated Movie List</h2>
      <div className="pagination">
        {pagination.prev ?
          <Button size="sm" variant="outline-success" disabled>no more</Button> :
          <Button size="sm" variant="outline-success" onClick={handlePrev} disabled={!isLoaded}>prev</Button>
        }
        <p className="page-info">{pagination.page}/{totalPages}</p>

        {pagination.next ?
          <Button size="sm" variant="outline-success" disabled>no more</Button> :
          <Button size="sm" variant="outline-success" onClick={handleNext} disabled={!isLoaded}>next</Button>
        }
      </div>
      <span>Sort by:{'  '}</span>
      <div className="sort">
        <SortButton items={items} setItems={setItems} variant="outline-info" id="title" />
        <SortButton items={items} setItems={setItems} variant="outline-danger" id="vote_count" />
        <SortButton items={items} setItems={setItems} variant="outline-dark" id="vote_average" />
        <SortButton items={items} setItems={setItems} variant="outline-primary" id="release_date" />
      </div>
      {!isLoaded ? (
        <Spinner className="loading" animation="border" size="xl" />
      ) : (
          <div className="movie">
            <Row xs={1} md={4} lg={5}>
              {filterItems.map(item =>
                <Col className="shop-image" key={item.id}>
                  <Image src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title} fluid
                  />
                  <p className="title">
                    <img className="icon" src={movie_icon} alt="movie icon" />
                    <b>{' '}{item.title}</b></p>
                  <p className="release-date">{item.release_date}
                  </p>
                  <div className="add-block-button">
                    {likeList.find(like => like.id === item.id) ?
                      <Button size="sm" variant="danger" disabled>Liked</Button> :
                      <Button size="sm" variant="danger" onClick={() => addLike(item)}>Like</Button>
                    }
                    {'  '}<Button size="sm" variant="secondary" onClick={() => addBlock(item)}>Block</Button>
                  </div>
                  <button
                    onClick={() => handleCollapse(item.id)}
                    aria-controls="example-collapse-text"
                    aria-expanded={item.Collapse}
                    className="info"
                  >
                    <span>View Detail</span><span>{item.collapse ? "-" : "+"}</span>
                  </button>
                  <Collapse in={item.collapse}>
                    <div id="example-collapse-text">
                      <p className="vote-count"><b>Vote Count: </b>{item.vote_count}</p>
                      <p className="average-score"><b>Average Score: </b>{item.vote_average}/10</p>
                      <p className="overview"><b>Overview: </b>{item.overview}</p>
                    </div>
                  </Collapse>
                  <hr />
                </Col>
              )}
            </Row>
          </div>
        )}
    </div>
  )
}

export default MovieList;
