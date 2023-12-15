import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

export const SearchLoading = () => {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    // search the api

    async function fetchData() {
      setLoading(true);

      setNotices([]);

      const data = await fetch(
        `https://ws-public.interpol.int/notices/v1/red?forename=${debouncedSearch}&resultPerPage=200`
      ).then((res) => res.json());
      setNotices(data._embedded.notices);
      setLoading(false);
    }

    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  return (
    <div>

      <main>
        <input
          type="search"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p>Loading...</p>}

        {notices.map((notice) => {
          return (
            <div key={notice.entity_id}>
              <p>
                {notice.forename} {notice.name}
              </p>
              <p>{notice.date_of_birth}</p>
            </div>
          );
        })}
      </main>
    </div>
  );
};
