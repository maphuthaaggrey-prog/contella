
import Videos from '../components/Videos'
import Hero from '../components/Hero'
import MainHero from '../components/MainHero'
const Home = () => {
    return ( 
        <>
        <MainHero />
        <div className="wrap">
            <Hero />
            <Videos />
        </div>
        </>
     );
}
export default Home;