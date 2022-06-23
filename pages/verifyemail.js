import React from 'react';
import { MailOpenIcon } from '@heroicons/react/solid';


const VerifyEmail = () => {
    return (
        <section className="absolute w-full h-full">
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-2/5 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                        <div className="flex items-center justify-center h-full p-8">
                            <div className="overflow-hidden transition-all transform">
                                <h3 className="text-center font-medium leading-6">
                                    <div className="flex flex-col justify-center items-center space-y-4">
                                        <MailOpenIcon className="w-12 h-12 shrink-0 text-rose-500" />
                                    </div>
                                    <p className="text-2xl font-semibold mt-2">Confirm your email.</p>
                                </h3>

                                <p className="text-lg text-center mt-4">
                                    We&apos;ve emailed a magic link to you.
                                    <br />
                                    Check your inbox and click the link in the email to sign in.
                                    <br />
                                    You may close this window.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>
    )
}

export default VerifyEmail;