import Link from 'next/link'
import { Title, LinkButton } from '../style/pages/homePage.styled'

export default function Home() {
  return (
    <>
      <header>
        <Title>This is homepage</Title>
        <Link href={`/heroes`}>
          <LinkButton>TO HERO PAGE</LinkButton>
        </Link>
      </header>
    </>
  )
}
