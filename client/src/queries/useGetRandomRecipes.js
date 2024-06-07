import isEmpty from "lodash/isEmpty";
import { request } from "../utilities/request";

const fetchData = async (filters, pageParam) => {
  try {
    const data = await request(
      "GET",
      `complexSearch?query=${filters}&number=21&page=${pageParam}`
    );
    return data;
  } catch (error) {
    console.log(error);
    // Handle error
    return [];
  }
};

const useGetRecipes = (filter) => {
  // const query = useInfiniteQuery(
  //   ["random_recipes"],
  //   ({ pageParam = 1 }) => fetchData(filter, pageParam),
  //   {
  //     refetchOnMount: false,
  //     refetchOnWindowFocus: false,
  //     //   getNextPageParam: (lastPage, allPages) => {
  //     //     const nextPage =
  //     //       lastPage.length === LIMIT ? allPages.length + 1 : undefined;
  //     //     return nextPage;
  //     //   },
  //   },
  //   [filter]
  // );

  // return { ...query };
  return;
};

export default useGetRecipes;
