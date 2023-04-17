import { ReactElement } from "react"
import HeroList from "./heroList"
import styled from 'styled-components'

const Wording = styled.div`
    width: fit-content;
    margin: 30px auto;
`

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