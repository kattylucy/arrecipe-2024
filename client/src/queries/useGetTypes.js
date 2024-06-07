import { useQuery } from "@tanstack/react-query";
import isEmpty from "lodash/isEmpty";
import { get } from "../utilities/request";
import { capitalizeString } from "../utilities/functions";

const fetchData = async ({ queryKey }) => {
  const url = queryKey[1];
  const name = queryKey[2];
  const buildUrl = name ? `${url}?name=${capitalizeString(name)}` : url;
  try {
    const data = await get(buildUrl);
    return isEmpty(data) ? [] : data;
  } catch (error) {
    console.log("could not get types", error);
  }
};

export const useGetTypes = ({ url, search, enabled }) => {
  const query = useQuery({
    queryKey: ["get_types", url, search],
    queryFn: fetchData,
    enabled,
  });
  return { ...query };
};
