
interface HeroDtail {
    [key: string]: number
}

interface HeroListData {
    id: string, name: string, image: string
}

export const fetchHeroList = async () => {
    try {
        const res = await await fetch('https://hahow-recruit.herokuapp.com/heroes')
        const data: HeroListData[] = await res.json();
        return data;
    } catch (error) {
        return null;
    }
}

export const fetchHeroProfile = async (heroId: string) => {
    try {
        const res = await fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`);
        const data: HeroDtail = await res.json();
        return data;
    } catch (error) {
        return null;
    }
};

export const patchHeroProfile = async (heroId: string, data: HeroDtail) => {
    try {
        const res = await fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const resData: HeroDtail = await res.json();
        return resData;
    } catch (error) {
        return null;
    }
};