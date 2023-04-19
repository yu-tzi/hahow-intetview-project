import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import HeroList from './heroList'
import { DetailedContainer, PanelContainer, SinglePanel, HeroTitle, HeroNumber, PanelButton, ActionArea, ActionButton, RemainCount } from '@/style/pages/heroDetail.styled';
import { getObjectSumNum } from './common/util';
import { fetchHeroProfile, patchHeroProfile } from './common/fetchApi';
import { HeroPanelArea } from './common/component/HeroPanelArea';

interface HeroDtail {
    [key: string]: number
}

const HeroDetail = () => {
    const router = useRouter()
    const heroIdList = router.query?.heroId
    const heroId = heroIdList?.[0]
    const [data, setData] = useState<HeroDtail | null>(null)
    const [remainCount, setRemainCount] = useState<number | null>(null)
    const [availableCount, setAvailableCount] = useState<number | null>(null)
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        if (!heroId && heroId !== '0') {
            return;
        }
        setLoading(true);
        fetchHeroProfile(heroId[0])
            .then((data) => {
                if (data) {
                    setData(data);
                    setLoading(false);
                    setAvailableCount(getObjectSumNum(data));
                } else {
                    setData(null);
                    setLoading(false);
                }
            })
            .catch(() => {
                setData(null);
                setLoading(false);
            });
    }, [heroId]);
    useEffect(() => {
        if (!data || (!availableCount && availableCount !== 0)) {
            return
        }
        const nowSumData = getObjectSumNum(data)
        nowSumData && setRemainCount(availableCount - nowSumData)
    }, [data, availableCount])
    const onClickButtonAction = (key: string, count: number) => {
        setData((prevData) => {
            if (!prevData) {
                return null;
            }
            return {
                ...prevData,
                [`${key}`]: prevData[key] + count,
            };
        });
    }
    const onClickSendData = async () => {
        if ((!remainCount || remainCount > 0) && remainCount !== 0) {
            alert('剩餘點數不得為 0 以上')
            return
        }
        if ((!heroId && heroId !== '0') || !data) {
            return
        }
        setLoading(true)
        patchHeroProfile(heroId, data).then((res) => {
            setLoading(false)
            console.log(res)
        }).catch(() => {
            alert('something went wrong')
        })
    }
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
    return (
        <DetailedContainer>
            <HeroPanelArea data={data} remainCount={remainCount || 0} clickAction={onClickButtonAction}/>
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