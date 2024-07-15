import './Footer.css';
import { FaInstagram, FaLinkedin} from 'react-icons/fa';
const footer = () => {
    return (
        <footer class="footer flex justify-evenly">
            <div class="footer-section">
                <h4>Company</h4>
                <ul>
                    <li><a href="" target="_blank">About Us</a></li>
                    <li><a href="" target="_blank">Careers</a></li>
                </ul>

            </div>
            <div class="footer-section">
                <h4>View Website in</h4>
                <ul>
                    <li><span>English</span></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Need Help?</h4>
                <ul>
                    <li><a href="" target="_blank">Visit Help Center</a></li>
                    <li><a href="" target="_blank">Share Feedback</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Connect with Us</h4>
                <ul class="social-links">
                    <li><a href="" target="_blank" aria-label="Facebook"><FaInstagram/></a></li>
                    <li><a href="" target="_blank" aria-label="Twitter"><FaLinkedin/></a></li>
                </ul>
            </div>
            <div class="footer-bottom">
                <p>© 2024 STAR. All Rights Reserved.</p>
                <ul>
                    <li><a href="" target="_blank">Terms Of Use</a></li>
                    <li><a href="" target="_blank">Privacy Policy</a></li>
                    <li><a href="" target="_blank">FAQ</a></li>
                </ul>
            </div>
        </footer>

    )
}

export default footer