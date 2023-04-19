import { ReactElement } from "react"
import HeroList from "./heroList"
import { Wording } from '@/style/pages/heroIndex.styled';

const HeroMainPage = () => {
    return (
        <>
            <Wording>Click the card for more info.</Wording>
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

HeroMainPage.getLayout = getLayout

export default HeroMainPage