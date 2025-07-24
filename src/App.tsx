import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Faculty from './components/Faculty';
import Research from './components/Research';
import Events from './components/Events';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Programs />
      <Faculty />
      <Research />
      <Events />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;