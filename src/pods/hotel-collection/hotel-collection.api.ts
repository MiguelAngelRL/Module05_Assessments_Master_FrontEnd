import Axios, {AxiosError} from 'axios';
import { baseApiUrl } from 'core';

export interface HotelEntityApi {
  id: string;
  type: string;
  name: string;
  created: number;
  modified: number;
  address1: string;
  airportCode: string;
  amenityMask: number;
  city: string;
  confidenceRating: number;
  countryCode: string;
  deepLink: string;
  highRate: number;
  hotelId: number;
  hotelInDestination: boolean;
  hotelRating: number;
  location: {
    latitude: number;
    longitude: number;
  };
  locationDescription: string;
  lowRate: number;
  metadata: {
    path: string;
  };
  postalCode: number;
  propertyCategory: number;
  proximityDistance: number;
  proximityUnit: string;
  rateCurrencyCode: string;
  shortDescription: string;
  stateProvinceCode: string;
  thumbNailUrl: string;
  tripAdvisorRating: number;
  tripAdvisorRatingUrl: string;
}

const getHotelsUrl = `${baseApiUrl}/api/hotels`;

export const getHotelCollection = (): Promise<HotelEntityApi[]> =>
  Axios.get<HotelEntityApi[]>(getHotelsUrl)
    .then(({ data }) => data) //destructuring from "response". We could do: then((response)=>response.data)
    .catch((error: AxiosError) => {
      const responseCode = error.response ? error.response.status : undefined;
      switch(responseCode) {
        case 404:
          throw "Not Found";
          break;
        case 403:
          throw "Forbidden";
          break;
        case undefined:
          throw "Network Error";
          break;
        default:
          throw 'Unknown Error';
      }
    });