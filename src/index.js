import './index.css';

const getUserData= async() =>{
    try {
        const user = 'torrenegra';
        const resp = await fetch(`https://bio.torre.co/api/bios/${ user }`);
        const data = await resp.json();
        return data;
    }catch (error) {
        console.error(error)
    }
}


getUserData().then( ( { person, strengths }) =>{
    const name = person.name;
    document.body.append( name );
})
.catch( console.warn );