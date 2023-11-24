"use client"

import { Fragment, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Photos } from "unsplash-js/dist/methods/search/types/response";
import type { ApiResponse } from "unsplash-js/dist/helpers/response";
import { Image } from "@/components/Image";
import api from "@/utils/api";

interface InfinitePhotos extends Photos {
  nextCursor: number;
  prevCursor: number;
}

export default function Home() {
  const [page, setPage] = useState(0);
  const fetchImages = async ({ pageParam = 0 })=> {
    const res = await api.search.getPhotos({
      query: "san francisco",
      page: pageParam,
      perPage: 10,
      orderBy: "latest",
    }) as ApiResponse<InfinitePhotos>;

    if (res.errors) {
      throw res.errors[0];
    }

    if (pageParam === res.response.total_pages) {
      res.response.nextCursor = 0;
    } else {
      console.log(pageParam)
      res.response.nextCursor = pageParam + 1;
    }

    if (pageParam === 0) {
      res.response.prevCursor = res.response.total_pages;
    } else {
      res.response.prevCursor = pageParam - 1;
    }

    return res.response;
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['results'],
    queryFn: fetchImages,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 items-center my-20">
        {data.pages.map((group, i) => (
          <Fragment key={i}>
            {group.results.map((photo) => (
              <li>
                <Image
                  src={photo.urls.regular}
                  alt={photo.alt_description || ""}
                  credit={photo.user.name}
                />
                {/* <p key={photo.id}>{photo.alt_description}</p> */}
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
      <div className="relative flex justify-center my-6 z-50">
        <button
          className="px-6 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-xs"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  )
}
