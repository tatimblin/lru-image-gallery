import { createApi } from "unsplash-js";

export default createApi({ accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY as string });
