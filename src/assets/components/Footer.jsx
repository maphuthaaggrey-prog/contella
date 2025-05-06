import logo from '../images/footer.jpg';
import { Link } from 'react-router-dom';
import facebook from '../icons/Facebook_white.svg';
import instagram from '../icons/Instagram_white.svg';
import { useState } from 'react';

const Footer = () => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyQHojhiXl7xpB1ZqIOA4Lc_PPuth0e36GGHHTtYDdqZEiSKYzHPNLODYrqghqwQh2o/exec';

    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch(scriptURL, { 
            method: 'POST', 
            body: new FormData(e.target) 
        })
        .then(response => {
            setLoading(false);
            if (response.ok) {
                setMsg('Thank You For Subscribing!');
            } else {
                setMsg('Something went wrong. Please try again!');
            }
            setTimeout(() => setMsg(''), 5000);
            setEmail(''); 
        })
        .catch(error => {
            console.error('Error!', error.message);
            setLoading(false);
            setMsg('Thank You For Subscribing!');
            setTimeout(() => setMsg(''), 5000);
            setEmail('');
        });
    };

    return (
        <>
            <footer>
                <div className="footer-div">
                    <div className="footer-left">
                        <img src={logo} className="footerlogo" alt="Majita Mag Logo" />
                    </div>
                    <div className="footer-right">

                        <form className="footer" name="submit-to-google-sheet" onSubmit={handleSubmit}>
                            
                            <label>Stay Updated with the Latest Trends</label>
                            <input 
                                type="name" 
                                name="name" 
                                placeholder="Enter your Name"
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input 
                                type="email" 
                                name="Emails" 
                                placeholder="Enter your email" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input type="submit" style={{cursor: 'pointer'}} disabled={loading} />
                            <p style={{color: 'rgb(24, 117, 24)', marginTop: '10px', fontWeight: '600'}}>{msg}</p>

                            {loading && (
                                <div style={{textAlign: 'center', marginTop: '-1em', marginBottom: '-2em'}}>
                                    <img src="https://i.imgur.com/llF5iyg.gif" alt="Loading" style={{width: '25px', height: '25px'}} />
                                </div>
                            )}
                        </form>  


                    </div>
                </div>
                <div className="footer-bottom" style={{backgroundColor: '#E1002D', paddingTop: '10px' , paddingBottom:'10px', textAlign: 'center'}}>
                            <p style={{color: 'white',textAlign: 'center', textDecoration: 'underline'}}> <Link to="/termsandconditions">Terms and Conditions</Link></p>
                            <div className="footer-icons" >
                           <a href="https://www.facebook.com/profile.php?id=61572469034879" target='_blank' rel="noopener noreferrer" ><img src={facebook} alt="Facebook" style={{width: '30px'}} /></a>
                           <a href="https://www.instagram.com/majitamag/"target='_blank' rel="noopener noreferrer"  ><img src={instagram} alt="Instagram" style={{width: '30px'}} /></a>
                        </div>
                        </div>
            </footer>

        </>
    );
};

export default Footer;
