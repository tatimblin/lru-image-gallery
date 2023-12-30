"use client"

import { useCallback, useState, FormEvent } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import useMountTransition from "../hooks/useMountTransition";

export function SearchBar() {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState(["one", "two", "three"]);
    const [reveal, setReveal] = useState(false);
    const hasTransitionedIn = useMountTransition(reveal, 200);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()!;

    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams)
          params.set(name, value)
     
          return params.toString()
        },
        [searchParams]
    );

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push('/?' + createQueryString('search', search))
    }

    const handleFocus = () => {
        setReveal(reveal => !reveal);
    }

    return (
        <div className="relative w-full sm:w-fit">
            <form onSubmit={handleSubmit} className="relative z-10 flex align-middle bg-slate-100 hover:bg-slate-200 focus-within:bg-slate-200 sm:rounded-xl sm:focus-within:rounded-b-none ease-in duration-200">
                <input
                    value={search}
                    onFocus={handleFocus}
                    onBlur={handleFocus}
                    onChange={(event) => setSearch(event.target.value)}
                    type="text"
                    placeholder="Search"
                    className="py-2 px-4 bg-transparent focus:outline-none"
                />
                <button type="submit" className="flex justify-center w-10 pr-2 sm:pr-4 opacity-50 hover:opacity-100 min-w-5 min-h-5">
                    <Image src="/search.svg" alt="Search" width="32" height="32" />
                </button>
            </form>
            {(reveal || hasTransitionedIn) && (
                <ul className={clsx(
                    "absolute w-full bg-slate-100 sm:rounded-b-xl top-1/2 translate-y-3 opacity-0 ease-in duration-200",
                    {
                        "translate-y-4 opacity-100": (reveal && hasTransitionedIn),
                    },
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
