import styled from 'styled-components'

export const CardsContainer = styled.div`
    display: flex;
    max-width: 900px;
    flex-flow: row wrap;
    border: 1px solid #504646;
    justify-content: space-around;
    margin-left: auto;
    margin-right: auto;
    padding: 0px 20px;
`
export const CardBody = styled.a<{ idSelected: boolean }>`
    width: auto;
    height: 250px;
    border: ${p => (p.idSelected ? '5px solid #c7c7c7;' : '1px solid #504646;')};
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin: 10px;
    padding: 5px 5px;
    text-decoration: none;
`

export const CardName = styled.div`
    margin-top: 10px;
    color: #504646;
`
