import Link from "next/link"
import { useEffect, useState } from "react"
import styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from "next/router"

const CardsContainer = styled.div`
    display: flex;
    max-width: 900px;
    flex-flow: row wrap;
    border: 1px solid #504646;
    justify-content: space-around;
    margin-left: auto;
    margin-right: auto;
    padding: 0px 20px;
`
const CardBody = styled.a<{ idSelected: boolean }>`
    width: auto;
    height: 250px;
    border: ${p => (p.idSelected ? '5px solid #c7c7c7;' : '1px solid #504646;')};
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin: 10px;
    padding: 5px 5px;
    text-decoration: none;
`

const CardName = styled.div`
    margin-top: 10px;
    color: #504646;
`


const HeroList = () => {
    interface HeroDate {
        id: string, name: string, image: string
    }
    const [data, setData] = useState<HeroDate[] | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [pageId, setPageId] = useState<string>('')
    const router = useRouter()
    useEffect(() => {
        setLoading(true)
        fetch('https://hahow-recruit.herokuapp.com/heroes')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setData(data)
                setLoading(false)
            })
    }, [])
    useEffect(()=>{
        const id = router?.query?.heroId?.[0] || ''
        setPageId(id)
    },[router])

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