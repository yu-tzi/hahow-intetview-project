import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import HeroList from './heroList'
import styled from 'styled-components'

const DetailedContainer = styled.div`
    display: flex;
    max-width: 850px;
    padding: 20px 45px;
    flex-flow: row wrap;
    border: 1px solid #504646;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    justify-content: space-between;
`

const PanelContainer = styled.div`
`
const SinglePanel = styled.div`
    margin: 20px;
    display: flex;
`
const HeroTitle = styled.div`
    font-size: 20px;
    margin-right: 15px;
    width: 25px;
    text-align: center;
`
const HeroNumber = styled.div`
    font-size: 20px;
    width: 25px;
    text-align: center;
`
const PanelButton = styled.button`
    margin: 0px 10px;
`
const ActionArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
`
const ActionButton = styled.button``
const RemainCount = styled.div`
    margin-bottom: 10px;
`

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
        if(!heroId && heroId !== '0'){
            return
        }
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
            }).catch(()=>{
                setData(null)
                setLoading(false)
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
        }).catch(()=>{
            alert('something went wrong')
        })

    }
    return (
        <DetailedContainer>
            <PanelContainer>
                {Object.keys(data).map((key, index) => (
                    <SinglePanel key={key+index}>
                        <HeroTitle>{key}</HeroTitle>
                        <PanelButton disabled={!remainCount} onClick={() => { onClickButtonAction(key, 1) }}>+</PanelButton>
                        <HeroNumber>{data[key]}</HeroNumber>
                        <PanelButton disabled={data[key] < 1} onClick={() => { onClickButtonAction(key, -1) }}>-</PanelButton>
                    </SinglePanel>
                ))}
            </PanelContainer>
            <ActionArea>
                <RemainCount>剩餘點數 : {remainCount}</RemainCount>
                <ActionButton onClick={onClickSendData}>儲存</ActionButton>
            </ActionArea>
        </DetailedContainer>
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