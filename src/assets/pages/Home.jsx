
import Videos from '../components/Videos'
import Hero from '../components/Hero'
import MainHero from '../components/MainHero'
import LekompoHome from '../components/LekompoHome';

const Home = () => {
    return ( 
        <>
        <MainHero />
        <div className="wrap">
            <Hero />
            <Videos />
            <LekompoHome />
        </div>
        
        </>
     );
}
export default Home;