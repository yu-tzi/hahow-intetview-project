import { HeroNumber, HeroTitle, PanelButton, PanelContainer, SinglePanel } from "@/style/pages/heroDetail.styled"

interface HeroDtail {
    [key: string]: number
}

interface Props {
    data: HeroDtail; remainCount: number; clickAction: (key: string, count: number) => void
}

export const HeroPanelArea: React.FC<Props> = ({ data, remainCount, clickAction }) => {
    return (
        <PanelContainer>
            {Object.keys(data).map((key) => (
                <SinglePanel key={key}>
                    <HeroTitle>{key}</HeroTitle>
                    <PanelButton disabled={!remainCount} onClick={() => { clickAction(key, 1) }}>+</PanelButton>
                    <HeroNumber>{data[key]}</HeroNumber>
                    <PanelButton disabled={data[key] < 1} onClick={() => { clickAction(key, -1) }}>-</PanelButton>
                </SinglePanel>
            ))}
        </PanelContainer>
    )
}