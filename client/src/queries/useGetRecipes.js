import { useInfiniteQuery } from "react-query";
import isEmpty from "lodash/isEmpty";
import { request } from "../utilities/request";

const LIMIT = 9;

const fetchData = async (filters, pageParam) => {
  try {
    const data = await request("GET", transformUrl(filters, pageParam));
    console.log(data);
    // return isEmpty(data.data) ? [] : transformData(data.data)
  } catch (error) {
    console.log(error);
    // Handle error
  }
};
const useGetRecipes = (filter) => {
  // const query = useInfiniteQuery(
  //   ["recipes", filter],
  //   ({ pageParam = 1 }) => fetchData(filter, pageParam),
  //   {
  //     refetchOnMount: false,
  //     refetchOnWindowFocus: false,
  //     getNextPageParam: (lastPage, allPages) => {
  //       const nextPage =
  //         lastPage.length === LIMIT ? allPages.length + 1 : undefined;
  //       return nextPage;
  //     },
  //   },
  //   [filter]
  // );
  // return { ...query };
};

export default useGetRecipes;
