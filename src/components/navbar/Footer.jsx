import instagram from "../../assets/icons/instagram.png"
import facebook from "../../assets/icons/facebook.png"
import twitter from "../../assets/icons/twitter.svg"



export default function Footer() {

    return (
        <>
            {/* footer */}
            <footer className='bg-black w-full justify-center py-10'>
                <div className='w-[90%] flex flex-row justify-evenly mx-auto'>
                    {/* categoryOne */}
                    <div className='flex flex-col'>
                        <h1 className='font-display text-white py-2 font-semibold text-lg'> Help us</h1>
                        <ul>
                            <li className='text-white font-display text-sm'>Cancellation & Returns</li>
                            <li className='text-white font-display text-sm'>Payments</li>
                            <li className='text-white font-display text-sm'>Shipping</li>
                            <li className='text-white font-display text-sm'>FAQ</li>
                        </ul>
                    </div>

                    <div className='flex flex-col'>
                        <h1 className='font-display text-white py-2 font-semibold text-lg '> Explore</h1>
                        <ul>
                            <li className='text-white font-display text-sm'>As Seller</li>
                            <li className='text-white font-display text-sm'>Career</li>
                            <li className='text-white font-display text-sm'>Corporate Information</li>
                            <li className='text-white font-display text-sm'>About Us</li>

                        </ul>
                    </div>

                    <div className='flex flex-col'>
                        <h1 className='font-display text-white py-2 font-semibold text-lg '> Consumer Policy</h1>
                        <ul>
                            <li className='text-white font-display text-sm'>Cancellation & Returns</li>
                            <li className='text-white font-display text-sm'>Terms of Use</li>
                            <li className='text-white font-display text-sm'>Security</li>
                            <li className='text-white font-display text-sm'>Privacy</li>
                            <li className='text-white font-display text-sm'>Grievance Redressal</li>
                            <li className='text-white font-display text-sm'>Sitemap</li>
                        </ul>
                    </div>
                    {/* address */}

                    <div className='flex flex-col'>
                        <h1 className='font-display text-white py-2 font-semibold text-lg'> Contact Us</h1>
                        <p className='text-white font-display text-sm'> Yourkart Private Limited,
                            <br />
                            Buildings ABD, ABC & ABC ABC </p>
                    </div>
                </div>

                <div className=''>
                    <h2 className='font-display text-white font-semibold pl-2 my-1 text-lg'> Social Media: </h2>
                    <ul className='flex flex-row'>
                        <li className='mx-2'><a href='#'> <img src={instagram} alt="" className='w-[20px]' /></a></li>
                        <li className='mx-2'><a href='#'> <img src={facebook} alt="" className='w-[20px]' /></a></li>
                        <li className='mx-2'><a href='#'> <img src={twitter} alt="" className='w-[20px]' /></a></li>
                    </ul>
                </div>
            </footer >



        </>
    )
}