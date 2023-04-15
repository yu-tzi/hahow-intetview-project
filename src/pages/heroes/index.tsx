import { ReactElement } from "react"
import HeroList from "./heroList"

const HeroMainPage = () => {
    return (
        <>
            <div>123</div>
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