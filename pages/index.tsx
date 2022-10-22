import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Banner from '../components/Banner'
import { Layout } from '../components/Layout'
import ja from '../public/images/ja.jpg'

import IndexSection from '../components/IndexSection'
import { useRef, useState } from 'react'
import Nav from '../components/Nav'
import { useIntersectionObserver } from 'usehooks-ts'
import Contact from '../components/Contact'

const Home: NextPage = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {})

  return (
    <Layout>
      <Head>
        <title>PZ Solutions by Piotr Żabówka</title>
        <meta name="description" content="Strona Główna" />
      </Head>

      <Banner />
      
      <Nav sticky={!entry?.isIntersecting??false} />
      <div ref={ref}/>
      <div id="main">
        <section id="founder" className="main">
          <div className="spotlight">
            <div className="content">
              <header className="major">
                <h2>Piotr Żabówka</h2>
              </header>
              <p>
                Założył PZ Solutions w 2011 roku, ale już od 2001 roku wspiera
                wiele firm w realizacji projektów IT w Polsce i w Europie
              </p>
              <ul className="actions">
                {/* <li><Link to="/about-me" className="button">Czytaj dalej...</Link></li> */}
              </ul>
            </div>
            <span className="image">
              <Image src={ja} alt="" layout={'fill'} objectFit={'cover'} />
            </span>
          </div>
        </section>
        <IndexSection
          id="services"
          header={<h2>Usługi</h2>}
          footer={
            <ul className="actions">
              {/* <li><Link to="/services" className="button">Czytaj dalej...</Link></li> */}
            </ul>
          }
        >
          <ul className="features">
            <li>
              <span className="icon major style1 fa-code" />
              <h3>IT Architecture &amp; Development</h3>
              <p>
                Tworzenie architektur rozwiązań IT. Budowanie rozproszonej i
                skalowalnej infrastruktury dla projektów IT. Tworzenie
                oprogramowania w .net oraz javascript jako część zespołu jak i
                na indywidualne zamówienie.
              </p>
            </li>
            <li>
              <span className="icon major style3 fa-copy" />
              <h3>Project Management</h3>
              <p>
                Zarządzania projektami w metodykach zwinnych. Prowadzenie
                projektów w zespołach scrum&apos;owych.
              </p>
            </li>
            <li>
              <span className="icon major style5 fa-diamond" />
              <h3>IT Management</h3>
              <p>
                Zarządzanie infrastruturą IT. Administracja systemów
                wspomagających.
              </p>
            </li>
          </ul>
        </IndexSection>
      </div>
      <Contact />
    </Layout>
  )
}

export default Home
