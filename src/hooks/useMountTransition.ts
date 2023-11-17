import { useEffect, useState } from "react";

const useMountTransition = (isMounted: boolean, delay: number) => {
    const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (isMounted && !hasTransitionedIn) {
            setHasTransitionedIn(true);
        } else if (!isMounted && hasTransitionedIn) {
            timeoutId = setTimeout(() => setHasTransitionedIn(false), delay);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [isMounted, delay, hasTransitionedIn]);

    return hasTransitionedIn;
};

export default useMountTransition;
