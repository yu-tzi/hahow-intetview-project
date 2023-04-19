import Link from "next/link"
import { useEffect, useState } from "react"
import Image from 'next/image'
import { useRouter } from "next/router"
import { CardsContainer, CardBody, CardName } from '@/style/component/heroList.styled';
import { fetchHeroList } from "../../../common/fetchApi";

interface HeroListData {
    id: string, name: string, image: string
}
const HeroList = () => {
    const [data, setData] = useState<HeroListData[] | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [pageId, setPageId] = useState<string>('')
    const router = useRouter()
    useEffect(() => {
        setLoading(true)
        fetchHeroList()
            .then((data) => {
                if (data) {
                    setData(data)
                    setLoading(false)
                } else {
                    setData(null)
                    setLoading(false)
                }
            }).catch(() => {
                setData(null)
                setLoading(false)
            })
    }, [])
    useEffect(() => {
        const id = router?.query?.heroId?.[0] || ''
        setPageId(id)
    }, [router])
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
    return (
        <CardsContainer>
            {
                data.map((d) => {
                    return (
                        <Link href={`/heroes/${d.id}`} key={d.id} passHref legacyBehavior>
                            <CardBody idSelected={d.id === pageId}>
                                <Image
                                    src={d.image}
                                    alt={`picture of ${d.name}`}
                                    width={180}
                                    height={180}
                                />
                                <CardName>{d.name}</CardName>
                            </CardBody>
                        </Link>
                    )
                })
            }
        </CardsContainer>
    )
}

export default HeroList