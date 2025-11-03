import {JSX} from "react";

export default function Loading(): JSX.Element {
    return (
        <div className="h-screen flex items-center justify-center bg-black">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Loading your portfolio...</p>
            </div>
        </div>
    );
}
