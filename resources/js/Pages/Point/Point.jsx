import React from "react";
import { CustomToaster } from "@/Components/CustomToaster";
import toast from "react-hot-toast";
import { Link, useForm } from "@inertiajs/react";
import { ChevronLeft, EditIcon, ProfileIcon2, XIcon2 } from "@/Components/Icon/Outline";
import { useState } from "react";
import { useEffect } from "react";
import { formatDateTime } from "@/Composables";

export default function Point({ auth }) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {

            const response = await axios.get('/getAllPointTransaction');
            
            setData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <CustomToaster />
            <div className="w-full flex justify-center">
                <div className="max-w-md w-full flex flex-col min-h-[80vh] overflow-auto">
                    <div className="bg-white py-3 px-3 flex justify-between items-center gap-3 shadow-box">
                        <Link href={route('profile')}>
                            <div className="rounded-full bg-white w-6 h-6 p-1 flex justify-center items-center" >
                                <ChevronLeft />
                            </div>
                        </Link>
                        <div className="text-neutral-900 font-bold text-sm">
                            Point History
                        </div>
                        <div className="w-6 h-6">
                                
                        </div>
                    </div>
                    {
                        data.length > 0 ? (
                            <div className="p-3 flex flex-col overflow-auto max-h-[80vh]">
                                {
                                    data.map((point, index) => (
                                        <div key={index} className="py-3 flex justify-between">
                                            <div className="flex flex-col">
                                                <div className="text-neutral-900 text-sm font-bold">
                                                    Points
                                                </div>
                                                <div className="text-neutral-500 text-xs">
                                                    {formatDateTime(point.created_at)}
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="text-primary-500 text-sm font-bold">
                                                    + {point.earning_point} pts
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className="text-lg font-bold flex justify-center items-center">
                                No point History Found
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}