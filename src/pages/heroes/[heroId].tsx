import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import HeroList from './heroList'

const HeroDetail = () => {
    interface HeroDatil {
        [key: string]: number
    }
    const router = useRouter()
    const { heroId } = router.query
    const [data, setData] = useState<HeroDatil | null>(null)
    const [remainCount, setRemainCount] = useState<number | null>(null)
    const [availableCount, setAvailableCount] = useState<number | null>(null)
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`)
            .then((res) => res.json())
            .then((data: HeroDatil) => {
                console.log(data)
                setData(data)
                setLoading(false)
                const sumData = Object.values(data).reduce((acc, cur) => acc + cur);
                console.log(sumData)
                setAvailableCount(sumData)
            })
    }, [heroId])
    const checkRemain = () => {
        console.log(availableCount)
        if (!data || (!availableCount && availableCount !== 0)) {
            return
        }
        const nowSumData = Object.values(data).reduce((acc, cur) => acc + cur);
        setRemainCount(availableCount - nowSumData)
    }
    useEffect(() => {
        console.log(data)
        checkRemain();
    }, [data])
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
    const onClickButtonAction = (key: string, count: number) => {
        console.log(key + count)
        setData({
            ...data,
            [`${key}`]: data[key] + count,
        })
    }
    const onClickSendData = async () => {
        if ((!remainCount || remainCount > 0) && remainCount !== 0) {
            alert('剩餘點數不得為 0 以上')
            return
        }
        setLoading(true)
        console.log(JSON.stringify(data))
        fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            console.log(res)
            setLoading(false)
        })

    }
    return (
        <>
            {Object.keys(data).map((key) => (
                <>
                    <div>
                        <button disabled={!remainCount} onClick={() => { onClickButtonAction(key, 1) }}>+</button>
                        <div>{`${key} : ${data[key]}`}</div>
                        <button disabled={data[key] < 1} onClick={() => { onClickButtonAction(key, -1) }}>-</button>
                    </div>
                </>
            ))}
            <div>Remain Count : {remainCount}</div>
            <button onClick={onClickSendData}>SEND</button>
            <Link href={`/heroes`}>TO HERO PAGE</Link>
        </>
    )
}


const getLayout = (page: ReactElement) => {
    return (
        <>
            <HeroList />
            {page}
        </>

    )
}

HeroDetail.getLayout = getLayout

export default HeroDetail