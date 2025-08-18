import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Programs from '../components/Programs';
import Faculty from '../components/Faculty';
import Research from '../components/Research';
import Events from '../components/Events';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Programs />
      <Faculty />
      <Research />
      <Events />
      <Contact />
    </div>
  );
};

export default Home;
