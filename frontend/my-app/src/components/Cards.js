import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Projects!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='/images/peepohappy.jpg'
              text='CoinFlip'
              label='Crypto'
              path='/services'
            />
            <CardItem
              src='/images/peepohands.jpeg'
              text='RobinMania'
              label='GameFi'
              path='/services'
            />
            <CardItem
              src='/images/peeposhy.jpg'
              text='A shy peepo'
              label='cute'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='/images/peepohey.png'
              text='A random peepo chillin'
              label='cute'
              path='/products'
            />
            <CardItem
              src='/images/peepoblanket.jpg'
              text='peepo in his element'
              label='cute'
              path='/sign-up'
            />
            <CardItem
              src='/images/peepolove.png'
              text='peepo giving y all some love'
              label='cute'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
