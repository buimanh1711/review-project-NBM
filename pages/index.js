import Head from 'next/head';
import styles from '../styles/Home.module.css';
import MainLayout from '../components/mainLayout';

import { Carousel } from 'antd';

function onChange(a, b, c) {
  console.log(a, b, c);
}
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        
      </Head>

      <MainLayout currentPage={0}>
          <div className={styles.homePage}>
          <Carousel afterChange={onChange}>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
          </div>
      </MainLayout>
    </div>
  )
}
