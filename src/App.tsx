import { useState } from 'react'
import { About } from './components/About'
import { Categories } from './components/Categories'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Loader } from './components/Loader'
import { Location } from './components/Location'
import { Products } from './components/Products'
import { ScrollProgress } from './components/ScrollProgress'
import { Showcase } from './components/Showcase'
import { WhyChooseUs } from './components/WhyChooseUs'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <Loader onDone={() => setReady(true)} />
      <ScrollProgress />
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Header />
        <main>
          <Hero />
          <About />
          <Categories />
          <Products />
          <WhyChooseUs />
          <Showcase />
          <Contact />
          <Location />
        </main>
        <Footer />
      </div>
    </>
  )
}
