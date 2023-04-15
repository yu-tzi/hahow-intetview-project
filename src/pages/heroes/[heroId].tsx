import { Aguafina_Script } from 'next/font/google'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const HeroDetail = () => {
    interface HeroDatil {
        agi: number,
        int: number,
        luk: number,
        str: number
    }
    const router = useRouter()
    const { heroId } = router.query
    const [data, setData] = useState<HeroDatil | null>(null)
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setData(data)
                setLoading(false)
            })
    }, [])
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
    return (
        <>
            <div>{`now id: ${heroId}`}</div>
            <div>{`agi: ${data.agi}`}</div>
            <div>{`int: ${data.int}`}</div>
            <div>{`luk: ${data.luk}`}</div>
            <div>{`str: ${data.str}`}</div>
        </>
    )
}

export default HeroDetail