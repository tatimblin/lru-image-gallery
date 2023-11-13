"use client"

import { useState, SyntheticEvent } from "react";
import Image from "next/image";

export function SearchBar() {
    const [suggestions, setSuggestions] = useState(["one", "two", "three"]);

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
    }

    return (
        <div className="relative">
            <form onSubmit={handleSubmit} className="relative z-10 flex align-middle bg-slate-100 rounded-xl">
                <input type="text" placeholder="Search" className="py-2 px-4 bg-transparent focus:outline-none" />
                <button type="submit" className="pr-4 opacity-50 hover:opacity-100">
                    <Image src="/search.svg" alt="Search" width="22" height="22" />
                </button>
            </form>
            <ul className="absolute w-full bg-slate-100 rounded-b-xl top-1/2 pt-4">
                {suggestions.map((suggestion) => (
                    <li className="px-4 py-2">
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>
    );
}
