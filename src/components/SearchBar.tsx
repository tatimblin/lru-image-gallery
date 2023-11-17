"use client"

import { useState, SyntheticEvent } from "react";
import Image from "next/image";
import clsx from "clsx";
import useMountTransition from "../hooks/useMountTransition";

export function SearchBar() {
    const [suggestions, setSuggestions] = useState(["one", "two", "three"]);
    const [reveal, setReveal] = useState(false);
    const hasTransitionedIn = useMountTransition(reveal, 1000);

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
    }

    const handleFocus = () => {
        setReveal(reveal => !reveal);
    }

    return (
        <div className="relative w-full sm:w-fit">
            <form onSubmit={handleSubmit} className="relative z-10 flex align-middle bg-slate-100 hover:bg-slate-200 focus-within:bg-slate-200 sm:rounded-xl sm:focus-within:rounded-b-none">
                <input
                    onFocus={handleFocus}
                    onBlur={handleFocus}
                    type="text"
                    placeholder="Search"
                    className="py-2 px-4 bg-transparent focus:outline-none"
                />
                <button type="submit" className="flex justify-center w-10 pr-2 sm:pr-4 opacity-50 hover:opacity-100 min-w-5 min-h-5">
                    <Image src="/search.svg" alt="Search" width="32" height="32" />
                </button>
            </form>
            {(hasTransitionedIn || reveal) && (
                <ul className={clsx(
                    "absolute w-full bg-slate-100 sm:rounded-b-xl top-0 pt-4 ease-in duration-300"
                )}>
                    {suggestions.map((suggestion) => (
                        <li key={suggestion} className="px-4 py-2">
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
