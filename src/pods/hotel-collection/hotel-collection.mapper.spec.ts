import * as hotelCollectionMapper from "./hotel-collection.mapper";
import * as apiModel from "./hotel-collection.api";
import * as viewModel from "./hotel-collection.vm";
import { basePicturesUrl } from 'core';

describe("Hotel Collection Mapper specs", () =>{
    it("Should return null when receive a null value", ()=>{
        //Arrange
        const objectReceivedFromApi: apiModel.HotelEntityApi = null;
        const expectedResult: viewModel.HotelEntityVm = null;
        // //Act
        const result: viewModel.HotelEntityVm = hotelCollectionMapper.mapFromApiToVm(objectReceivedFromApi);
        //Assert
        expect(result).toStrictEqual(expectedResult);
    });

    it("Should return null when receive an undefined value", ()=>{
        //Arrange
        const objectReceivedFromApi: apiModel.HotelEntityApi = undefined;
        const expectedResult: viewModel.HotelEntityVm = null;
        // //Act
        const result: viewModel.HotelEntityVm = hotelCollectionMapper.mapFromApiToVm(objectReceivedFromApi);
        //Assert
        expect(result).toStrictEqual(expectedResult);
    });

    it("Should return one HotelEntityVm mapped item when receive one HotelEntityApi item", ()=>{
        //Arrange
        const objectReceivedFromApi: apiModel.HotelEntityApi = {
            "id" : "0248058a-27e4-11e6-ace6-a9876eff01b3",
            "name" : "Motif Seattle",
            "address1" : "1415 5th Ave",
            "city" : "Seattle",
            "confidenceRating" : 52,
            "countryCode" : "US",
            "highRate" : 289,
            "hotelRating" : 4,
            "hotelInDestination" : true,
            "shortDescription" : "With a stay at Motif Seattle, you will be centrally located in Seattle",
            "thumbNailUrl" : "/thumbnails/50947_264_t.jpg",
        } as unknown as apiModel.HotelEntityApi; //Trick to not have to populate every HotelEntityApi property. Also works with 'as any'
        
        const expectedResult: viewModel.HotelEntityVm = {
            id : "0248058a-27e4-11e6-ace6-a9876eff01b3",
            picture: `${basePicturesUrl}/thumbnails/50947_264_t.jpg`,
            name: "Motif Seattle",
            description: "With a stay at Motif Seattle, you will be centrally located in Seattle",
            rating: 4,
            address: "1415 5th Ave"
        };
        //Act
        const result: viewModel.HotelEntityVm = hotelCollectionMapper.mapFromApiToVm(objectReceivedFromApi);
        //Assert
        expect(result).toEqual(expectedResult);
    });

    it("Should return one HotelEntityVm mapped item with undefined values when receive one HotelEntityApi empty item", ()=>{
        //Arrange
        const objectReceivedFromApi: apiModel.HotelEntityApi = {
        } as unknown as apiModel.HotelEntityApi; //Trick to not have to populate every HotelEntityApi property. Also works with 'as any'
        
        const expectedResult: viewModel.HotelEntityVm = {
            id : undefined,
            picture: `${basePicturesUrl}undefined`,
            name: undefined,
            description: undefined,
            rating: undefined,
            address: undefined
        };
        //Act
        const result: viewModel.HotelEntityVm = hotelCollectionMapper.mapFromApiToVm(objectReceivedFromApi);
        //Assert
        expect(result).toEqual(expectedResult);
    });

    it("Should return one HotelEntityVm mapped item partially with undefined values when receive one \
incomplete HotelEntityApi item", ()=>{
        //Arrange
        const objectReceivedFromApi: apiModel.HotelEntityApi = {
            "name" : "Motif Seattle",
            "city" : "Seattle",
            "confidenceRating" : 52,
            "countryCode" : "US",
            "highRate" : 289,
            "hotelRating" : 4,
            "hotelInDestination" : true,
        } as unknown as apiModel.HotelEntityApi; //Trick to not have to populate every HotelEntityApi property. Also works with 'as any'
        
        const expectedResult: viewModel.HotelEntityVm = {
            id : undefined,
            picture: `${basePicturesUrl}undefined`,
            name: "Motif Seattle",
            description: undefined,
            rating: 4,
            address: undefined
        };
        //Act
        const result: viewModel.HotelEntityVm = hotelCollectionMapper.mapFromApiToVm(objectReceivedFromApi);
        //Assert
        expect(result).toEqual(expectedResult);
    });
});