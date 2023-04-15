import { useEffect, useState } from "react"

const HeroMainPage = () => {
    interface HeroDate {
        id: string, name: string, image: string
    }
    const [data, setData] = useState<HeroDate[] | null>(null)
    const [isLoading, setLoading] = useState(false)
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

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
    return (
        <>
            {
                data.map((d) => {
                    return <>
                        <div>{d.id}</div>
                        <div>{d.name}</div>
                        <img src={d.image} alt="hero image" />
                    </>
                })
            }

        </>
    )
}

export default HeroMainPage