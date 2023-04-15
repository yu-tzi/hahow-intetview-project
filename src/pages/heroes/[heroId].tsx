import { useRouter } from 'next/router'

const HeroDetail = () => {
  const router = useRouter()
  const { heroId } = router.query

  return <p>id: {heroId}</p>
}

export default HeroDetail