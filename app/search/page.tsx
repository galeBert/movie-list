import React, { Suspense } from "react";
import SearchResult from "./components/search-result";

export default function Search() {
  return (
    <div>
      <Suspense fallback={<h1>Loading...</h1>}>
        <SearchResult />
      </Suspense>
    </div>
  );
}
