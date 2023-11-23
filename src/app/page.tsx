"use client"

import { Fragment, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Photos } from "unsplash-js/dist/methods/search/types/response";
import type { ApiResponse } from "unsplash-js/dist/helpers/response";
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

    if (pageParam !== res.response.total_pages) {
      res.response.nextCursor = pageParam + 1;
    }

    if (pageParam !== 0) {
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
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  })

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map((group, i) => (
        <Fragment key={i}>
          {group.results.map((photo) => (
            <p key={photo.id}>{photo.alt_description}</p>
          ))}
        </Fragment>
      ))}
      <div>
        <button
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
