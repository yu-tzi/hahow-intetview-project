import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'

const Title = styled.h1`
  margin: 30px;
  text-align: center;
`
const LinkButton = styled.div`
  text-align: center;
`

export default function Home() {
  return (
    <>
      <Head>
        <title>Applicant project assignment by Yutzi</title>
        <meta name="description" content="Project assignment required for applicants to submit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Title>This is homepage</Title>
        <Link href={`/heroes`}>        
          <LinkButton>TO HERO PAGE</LinkButton>
        </Link>
      </main>
    </>
  )
}
