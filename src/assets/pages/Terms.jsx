import MainLogo from '../contella logo.png'
const Terms= () => {
    return ( 
        <>
            <div className="wrap">
                <img src={MainLogo} style={{width: '150px', marginTop: '3em'}}></img>
                <div className="terms">
                  <p className="heading-whats-new">Terms and Conditions</p>
                  <p>Welcome to Contella, a digital magazine platform dedicated to showcasing South African content creators and highlighting developments in the new generation creative industry.
                  <br />
                  <br />
                  By accessing or using this website, you agree to be bound by the following Terms and Conditions. If you do not agree with any part of these terms, please do not use the website.</p>
                    <div className="line"></div>
                    <h3>1. Content and Purpose</h3>
                    <p>This website serves as a curated platform that:</p>
                    <ul>
                        <li>Publishes biographies of known South African content creators.</li>
                        <li>Shares videos of creators, uploaded only by the site administrator.</li>
                        <li>Highlights events, trends, and stories in the SA new-gen industry (entertainment, digital content, youth culture, etc.).</li>
                    </ul>
                    <h3>2. User Conduct</h3>
                    <ul>
                        <li>Users may browse and view all publicly available content.</li>
                        <li>Users are not permitted to upload videos or edit content.</li>
                        <li>All content submissions (e.g., biography updates or correction requests) must be sent through the provided contact methods for admin review.</li>
                    </ul>
                    <h3>3. Content Ownership</h3>
                    <p>All articles, biographies, graphics, videos, and other materials on this website are either:</p>
                    <ul>
                        <li>
                        Created by the website team, or
                        </li>
                        <li>Used with permission from the respective content creators.</li>
                    </ul>
                    <h3>4. Intellectual Property</h3>
                    <p>All intellectual property rights on this website—including text, media, branding, layout, and design—are owned by or licensed to [Your Website Name], unless otherwise stated. Any third-party trademarks or media are credited and used within fair use or with permission.</p>
                    <h3>5. Video Hosting and Permissions</h3>
                    <ol>
                        <li>Only the website administrator may upload videos to the platform.</li>
                        <li>Any videos shared are either:
                            <ul>
                                <li>Publicly available and embedded from external platforms (e.g., YouTube), or</li>
                                <li>Submitted by creators with permission for publication.</li>
                            </ul>
                        </li>
                    </ol>
                    <h3>6. External Links</h3>
                    <p>This website may contain links to external sites for additional information. These are provided for convenience only. We are not responsible for the content or privacy policies of third-party websites.</p>
                    <h3>7. Privacy</h3>
                    <p>Your privacy is important to us. We do not collect personal information unless voluntarily submitted (e.g., through contact forms).</p>
            </div>
            </div>
        </>
     );
}
 
export default Terms;