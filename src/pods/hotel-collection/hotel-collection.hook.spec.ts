import { useHotelCollection } from "./hotel-collection.hook";
import { renderHook, act } from "@testing-library/react-hooks";
import * as hotelCollectionApi from "./hotel-collection.api";
import { mapFromApiToVm } from './hotel-collection.mapper';
import * as mappers from 'common/mappers';
import { HotelEntityVm } from './hotel-collection.vm';
import { wait } from "@testing-library/react";
import { jssPreset } from "@material-ui/core";

describe("Hotel Collection Hook specs", ()=>{
    
    it("Should return an empty HotelEntityVm array and the function 'loadHotelCollection'", ()=>{
        //Arrange
        const expectedHotelCollection: HotelEntityVm[] = [];
        //Act
        const { result } = renderHook(()=>useHotelCollection());
        //Assert
        expect(result.current.hotelCollection).toEqual(expectedHotelCollection);
        expect(result.current.loadHotelCollection).toEqual(expect.any(Function));
    });

    it("Should update hotelCollection when 'loadHotelCollection' is invoked and the promise is resolved", async()=>{
        //Arrange
        const hotels = [{
            name: 'My test hotel',
            hotelRating: 4,
            "thumbNailUrl" : "/pic.jpg",
        } as unknown as hotelCollectionApi.HotelEntityApi
        ];
        //const expectedHotelCollection: HotelEntityVm[] = mappers.mapToCollection(hotels, mapFromApiToVm);
        const expectedHotelCollection = [{
            "picture":"http://localhost:3000/pic.jpg",
            "name":"My test hotel",
            "rating":4
        } as unknown as HotelEntityVm
        ]
        jest.spyOn(hotelCollectionApi, "getHotelCollection").mockResolvedValue(hotels);
        const mapToCollectionStub = jest.spyOn(mappers, "mapToCollection");
        //Act
        const { result, waitForNextUpdate } = renderHook(()=>useHotelCollection());
        act(()=>result.current.loadHotelCollection());
        await waitForNextUpdate();
        //Assert
        expect(mapToCollectionStub).toHaveBeenCalledWith(hotels, mapFromApiToVm);
        expect(result.current.hotelCollection).toEqual(expectedHotelCollection);
    });

    it("Should update hotelCollection as an empty array when 'loadHotelCollection' is invoked and the promise is rejected", async()=>{
        //Arrange
        const expectedHotelCollection: HotelEntityVm[] = [];
        jest.spyOn(hotelCollectionApi, "getHotelCollection").mockRejectedValue("");
        //Act
        const { result } = renderHook(()=>useHotelCollection());
        await act(() => wait(()=>result.current.loadHotelCollection())); //otra forma de esperar a la actualizacion
        //Assert
        expect(result.current.hotelCollection).toEqual(expectedHotelCollection);
    });
});