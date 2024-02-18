import React from 'react'
import { Link } from "react-router-dom"
import Logo from "../Logo"

function Footer() {
    return (
        <section className="flex overflow-hidden flex-col ms:flex-row bg-gray-900">
            <div className='flex ms:w-[60%] w-full flex-col ss:flex-row items-center justify-center'>
                <div className="w-full p-6 flex justify-center">

                    <div className="h-full ">
                        <h3 className="tracking-px mb-4  text-xs font-semibold uppercase text-white">
                            Company
                        </h3>
                        <ul>
                            <li className="mb-2">
                                <Link
                                    className=" text-base font-medium text-gray-600 hover:text-gray-400"
                                    to="/"
                                >
                                    Features
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    className=" text-base font-medium text-gray-600 hover:text-gray-400"
                                    to="/"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    className=" text-base font-medium text-gray-600 hover:text-gray-400"
                                    to="/"
                                >
                                    Affiliate Program
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className=" text-base font-medium text-gray-600 hover:text-gray-400"
                                    to="/"
                                >
                                    Press Kit
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full p-6 flex justify-center">
                    <div className="h-full">
                        <h3 className="tracking-px mb-4  text-xs font-semibold uppercase text-white">
                            Support
                        </h3>
                        <ul>
                            <li className="mb-2">
                                <Link
                                    className=" text-base font-medium text-gray-600 hover:text-gray-400"
                                    to="/"
                                >
                                    Account
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    className=" text-base font-medium text-gray-600 hover:text-gray-400"
                                    to="/"
                                >
                                    Help
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    className=" text-base font-medium text-gray-600 hover:text-gray-400"
                                    to="/"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className=" text-base font-medium text-gray-600 hover:text-gray-400"
                                    to="/"
                                >
                                    Customer Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full p-6 flex justify-center">
                    <div className="h-full">
                        <h3 className="tracking-px mb-4  text-xs font-semibold uppercase text-white">
                            Legals
                        </h3>
                        <ul>
                            <li className="mb-2">
                                <Link
                                    className=" text-base font-medium text-gray-600 hover:text-gray-400"
                                    to="/"
                                >
                                    Terms &amp; Conditions
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    className=" text-base font-medium text-gray-600 hover:text-gray-400"
                                    to="/"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className=" text-base font-medium text-gray-600 hover:text-gray-400"
                                    to="/"
                                >
                                    Licensing
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-full ms:w-[40%] p-6 flex flex-col ss:flex-row justify-center items-center">
                <Logo width="100px" />
                <p className="text-sm text-white mt-6">
                    &copy; Copyright 2023. All Rights Reserved by Me.
                </p>
            </div>
        </section>
    )
}

export default Footer