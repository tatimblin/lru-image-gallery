"use client"

import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function Home() {
  const [images, setImages] = useState<unknown[]>([]);

  useEffect(() => {
    const test = async () => {
      return api.search.getPhotos({ query: "san francisco" });
    }

    test()
      .then((param) => console.log(param))

    console.log(test);
    setImages(() => {
      return ["hey"];
    });
  }, []);

  return (
    <div className="">
      <h1>All Images</h1>
    </div>
  )
}
