import { ReactElement } from "react"
import HeroList from "../../component/HeroList"
import { Wording } from '@/style/pages/heroIndex.styled';

const HeroMainPage = () => {
    return (
        <main>
            <Wording>Click the card for more info.</Wording>
        </main>
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