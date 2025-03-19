import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#0b0b45] text-white py-7 px-4 sm:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-center max-w-8xl mx-auto mt-40">
                {/* Left Section */}
                <div className="w-full lg:w-4/12 mb-8 lg:mb-0 lg:ml-10 text-center lg:text-left">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                        June Homes provides apartments and rooms for rent in major US cities on flexible lease terms.
                    </h2>
                    <img src="/assets/notpen.png" alt="Checklist" className="mx-auto lg:mx-0" />
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-6/12 space-y-8 lg:space-y-10">
                    {/* First Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">New York, NY</h3>
                            <ul className="space-y-1 text-sm">
                                <li>Rooms</li>
                                <li>Furnished Apartments</li>
                                <li>Studios</li>
                                <li>Brooklyn</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Washington, D.C.</h3>
                            <ul className="space-y-1 text-sm">
                                <li>Rooms</li>
                                <li>Apartments</li>
                                <li>Studios</li>
                                <li>DC Student Housing</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Boston, MA</h3>
                            <ul className="space-y-1 text-sm">
                                <li>Rooms</li>
                                <li>Apartments</li>
                                <li>Studios</li>
                                <li>Boston Student Housing</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Chicago, IL</h3>
                            <ul className="space-y-1 text-sm">
                                <li>Rooms</li>
                                <li>Apartments</li>
                                <li>Studios</li>
                                <li>Chicago Student Housing</li>
                            </ul>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Other cities</h3>
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
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Housing</h3>
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
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Company</h3>
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
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Other</h3>
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

            {/* Contact Info */}
            <div className="text-center mt-14 text-sm">
                Get in touch with us: +1 (888) 604-6697 | 7:30am to 8pm CT | email us: welcome@junehomes.com
                <br />
                June Homes US, Inc. | California DRE # 02161034
            </div>
        </footer>
    );
};

export default Footer;