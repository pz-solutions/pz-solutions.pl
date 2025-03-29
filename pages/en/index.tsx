import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Banner from '../../components/Banner'
import { Layout } from '../../components/Layout'
import ja from '../../public/images/ja.jpg'

import IndexSection from '../../components/IndexSection'
import { Nav, NavItem } from '../../components/Nav'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import Contact from '../../components/Contact'

const Home: NextPage = () => {
  const [ref, entry] = useIntersectionObserver({})
  const navItems: NavItem[] = [
    { title: 'Founder', href: '#founder' },
    { title: 'Services', href: '#services' },
  ];

  return (
    <Layout>
      <Head>
        <title>PZ Solutions by Piotr Żabówka</title>
        <meta name="description" content="Home Page" />
      </Head>

      <Banner description="IT Project Management &middot; Custom Software Development &middot; IT Consulting" />

      <Nav sticky={!entry?.isIntersecting} navigationItems={navItems} />
      <div ref={ref}></div>
      <div id="main">
        <section id="founder" className="main">
          <div className="spotlight">
            <div className="content">
              <header className="major">
                <h2>Piotr Żabówka</h2>
              </header>
              <p>
                Founded PZ Solutions in 2011, but has been supporting many companies in implementing IT projects in Poland and Europe since 2001.
              </p>
              <ul className="actions">
                {/* <li><Link to="/about-me" className="button">Read more...</Link></li> */}
              </ul>
            </div>
            <span className="image">
              <span>
                <Image src={ja} alt="" placeholder="blur" />
              </span>
            </span>
          </div>
        </section>
        <IndexSection
          id="services"
          header={<h2>Services</h2>}
          footer={
            <ul className="actions">
            </ul>
          }
        >
          <ul className="features">
            <li>
              <span className="icon major style1 fa-code" />
              <h3>IT Architecture & Development</h3>
              <p>
                Creating IT solution architectures. Building distributed and scalable infrastructure for IT projects. Developing software in .net and JavaScript as part of a team or on individual orders.
              </p>
            </li>
            <li>
              <span className="icon major style3 fa-copy" />
              <h3>Project Management</h3>
              <p>
                Project management in agile methodologies. Leading projects in scrum teams.
              </p>
            </li>
            <li>
              <span className="icon major style5 fa-diamond" />
              <h3>IT Management</h3>
              <p>
                Managing IT infrastructure. Administration of supporting systems.
              </p>
            </li>
          </ul>
        </IndexSection>
      </div>
      <Contact lang="en" />
    </Layout>
  );
};

export default Home;
