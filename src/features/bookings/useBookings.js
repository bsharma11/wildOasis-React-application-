import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllbookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //SORT
  const sortByraw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByraw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {}, // since the data returned from the qury function is an object that contains data and count so we destructure it here
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // here the second parameter(filter) tells the query to refetch data when filter changes
    // this array can also be thought of as dependency array
    queryFn: () => getAllbookings({ filter, sortBy, page }),
  });

  //PREFETCHING (fetching data before it is to be rendered)

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    //  we dont want to prefetch the next page when we are on the last page
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getAllbookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    //  we dont want to prefetch the prev page when we are on the first page
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getAllbookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, error, count };
}
