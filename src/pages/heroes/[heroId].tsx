import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import HeroList from './heroList'

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
                setAvailableCount(sumData)
            })
    }, [])
    useEffect(() => {
        console.log(data)
    }, [data])
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
    const onClickButtonAction = (key, count) => {
        console.log(key + count)
        setData({
            ...data,
            [`${key}`]: data[key] + count,
        })
    }
    const checkRemain = () => {
        const nowSumData = Object.values(data).reduce((acc, cur) => acc + cur);
        console.log(nowSumData + '   ' + availableCount)
        if (availableCount && (availableCount - nowSumData < 1)) {
            return true
        }
        return false
    }
    return (
        <>
            {Object.keys(data).map((key) => (
                <>
                    <div>
                        <button disabled={checkRemain()} onClick={() => { onClickButtonAction(key, 1) }}>+</button>
                        <div>{`${key} : ${data[key]}`}</div>
                        <button disabled={data[key] < 1} onClick={() => { onClickButtonAction(key, -1) }}>-</button>
                    </div>
                </>
            ))}
            <Link href={`/heroes`}>Beck To HOME page</Link>
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