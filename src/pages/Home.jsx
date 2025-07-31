import React from 'react'
import Banner from '../components/Banner'
import Header from '../components/Header'
import TopEvents from '../components/TopEvents'
import EventTypeMenu from '../components/EventTypeMenu'

const Home = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <EventTypeMenu />
      <TopEvents />
      <Banner />
    </div>
  )
}

export default Home