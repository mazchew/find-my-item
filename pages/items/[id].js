import Image from 'next/image';
import Layout from '@/components/Layout';
import { LocationMarkerIcon } from "@heroicons/react/solid";

const PostedItem = (item = null) => {
    return (
        <Layout>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4">
                    <div>
                        <h1 className="text-2xl font-semibold truncate">Item Title</h1>
                        <ol className="inline-flex items-center space-x-1 text-gray-500">
                            <li className="inline-flex items-center space-x-0.5">
                                <LocationMarkerIcon className="h-4 w-4" />
                                <span>
                                        test location  · 
                                </span>
                            </li>
                            <li>
                                <span>test category</span>
                            </li>
                        </ol>
                    </div>
                </div>

                <p className="mt-8 text-lg">item description</p>
            </div>
        </Layout>
    )


};

export default PostedItem;