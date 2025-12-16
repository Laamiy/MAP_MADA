import { ROUTE_GET_ICON } from "../../constants/api.constant"
import { AxiosErrorCustom } from "../axios.error.custum"
import apiClient from "../main"
import { useQuery } from "@tanstack/react-query"

interface GetIconByIdQuery {
  osm_id: string
}

export interface GetIconByIdResponse {
  osm_id: string
  name: string
  amenity: string
  tourism: string
  shop: string
  man_made: string
  leisure: string
  natural: string
  tags: Record<string, string>
  version: number
  lng: number
  lat: number
}

const getIconProfileById = async ({ osm_id }: GetIconByIdQuery) => {
  try {
    const query = `osm_id=${osm_id || ""}`
    const response = await apiClient.get<GetIconByIdResponse>(
      ROUTE_GET_ICON + query
    )
    return response.data
  } catch (error) {
    throw new AxiosErrorCustom(error)
  }
}

export const useGetIconProfileById = ({ osm_id }: GetIconByIdQuery) => {
  return useQuery({
    queryKey: ["osm_id", osm_id],
    queryFn: () => getIconProfileById({ osm_id }),
  })
}
