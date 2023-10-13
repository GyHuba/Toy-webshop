import '../css/components/footer.css'
import { SiFacebook,SiInstagram } from "react-icons/si";
import { BsTelephone } from "react-icons/bs"
import { MdOutlineMailOutline } from "react-icons/md"
import { RiMapPinUserLine } from "react-icons/ri"

export default function Footer() {
    return (
        <div className="footer">
             
            <div className='contact'>
                <p className='miniTitle'>Keress minket telefonon:</p>
                <p><BsTelephone/> +36 50 123 4567</p>
                <p className='miniTitle'>E-mailt is írhatsz nekünk:</p>
                <p><MdOutlineMailOutline/> info@betyarvar.hu</p>
                <div className='social'>
                    <p className='miniTitle'>Nézd meg social media felületeinket is:</p>
                    <p><SiFacebook/> Facebook </p>
                    <p><SiInstagram/> Instagram</p>
                </div>
            </div>

            <div className='map'>
                <div>
                    <p className='miniTitle'>Gyere el hozzánk személyesen:</p>
                    <p className='address'><RiMapPinUserLine/> 1111 Bp, Progmatic street 42.</p>
                    <iframe title="map" width="500" height="200" id="gmap_canvas" src="https://maps.google.com/maps?q=budapest&t=&z=10&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                </div>
                
            </div>

        </div>

    )

}