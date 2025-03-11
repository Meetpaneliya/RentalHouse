import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#0b0b45] text-white py-7 px-8">
            <div className="flex justify-between items-center max-w-8xl mt-40">
                <div className="flex flex-col w-4/12 ml-10 ">
                    <h2 className="text-2xl font-semibold mb-2">June Homes provides apartments and rooms for rent in major US cities on flexible lease terms.</h2>
                    <img src="/assets/notpen.png" alt="Checklist" className="" />
                </div>

                <div className="flex flex-col w-6/12 space-y-10">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">New York, NY</h3>
                            <ul className="space-y-1 text-sm">
                                <li>Rooms</li>
                                <li>Furnished Apartments</li>
                                <li>Studios</li>
                                <li>Brooklyn</li>
                        
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">Washington, D.C.</h3>
                            <ul className="space-y-1 text-sm">
                                <li>Rooms</li>
                                <li>Apartments</li>
                                <li>Studios</li>
                                <li>DC Student Housing</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">Boston, MA</h3>
                            <ul className="space-y-1 text-sm">
                                <li>Rooms</li>
                                <li>Apartments</li>
                                <li>Studios</li>
                                <li>Boston Student Housing</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">Chicago, IL</h3>
                            <ul className="space-y-1 text-sm">
                                <li>Rooms</li>
                                <li>Apartments</li>
                                <li>Studios</li>
                                <li>Chicago Student Housing</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Other cities</h3>
                            <ul className="space-y-1 text-sm">
                                <li>Austin</li>
                                <li>Los Angeles</li>
                                <li>San Francisco</li>
                                <li>San Diego</li>
                                <li>Dallas</li>
                                <li>Jersey City</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">Housing</h3>
                            <ul className="space-y-1 text-sm">
                                <li>Military Housing</li>
                                <li>Travel Nurse Housing</li>
                                <li>Student Housing</li>
                                <li>Refer a Friend</li>
                                <li>Subletspots</li>
                                <li>FAQ</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">Company</h3>
                            <ul className="space-y-1 text-sm">
                                <li>About us</li>
                                <li>How it works</li>
                                <li>Careers</li>
                                <li>Blog</li>
                                <li>Sitemap</li>
                                <li>Reviews</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2">Other</h3>
                            <ul className="space-y-1 text-sm">
                                <li>Terms of Use</li>
                                <li>Cookie Policy</li>
                                <li>Privacy Policy</li>
                                <li>Rent Calculator</li>
                                <li>Roommate Rent Splitter</li>
                                <li>Roommate Agreement</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            <div className="text-center mt-14 text-sm">
                Get in touch with us: +1 (888) 604-6697 | 7:30am to 8pm CT | email us: welcome@junehomes.com
                <br />
                June Homes US, Inc. | California DRE # 02161034
            </div>
        </footer>
    );
};

export default Footer;