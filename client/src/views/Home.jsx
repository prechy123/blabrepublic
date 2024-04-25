import React from 'react'
import HeroSection from '../components/heroSection';
import Search from '../components/search';
import Card from '../components/card';

const Home = () => {
  const cards = [
    {
      image: 'https://via.placeholder.com/150',
      title: 'Card Title 1',
      description: 'This is the description for card 1.'
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Card Title 2',
      description: 'This is the description for card 2.'
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Card Title 3',
      description: 'This is the description for card 3.'
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Card Title 4',
      description: 'This is the description for card 1.'
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Card Title 5',
      description: 'This is the description for card 2.'
    },
    {
      image: 'https://via.placeholder.com/200',
      title: 'Card Title 6',
      description: 'This is the description for card 3.'
    },
  ];


  return (
    <div className='w-full'>
      <HeroSection />
      <Search />
      {/* Upper card section */}

      {/* Lower card section  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-20 mb-10 px-10">
        {cards.map((card) => (
          <Card key={card.title} image={card.image} title={card.title} description={card.description} />
        ))}
      </div>
    </div>
  )
}

export default Home