import { getHotelCollection, HotelEntityApi } from "./hotel-collection.api";
import Axios from "axios";
import { baseApiUrl } from 'core';

describe("Hotel Collection Api specs", () =>{
    it("Should return an array of HotelEntityApi elements if resolved successfully", async()=>{
        //Arrange
        const hotels: HotelEntityApi[] = [{
                name: 'My test hotel',
                hotelRating: 4
            } as unknown as HotelEntityApi
        ];
        const getStub = jest.spyOn(Axios, "get").mockResolvedValue(
            //mockeamos objeto "response" asignando a "data" nuestro array "hotels"
            { data: hotels }
        );
        // //Act
        const result = await getHotelCollection();
        //Assert
        expect(getStub).toHaveBeenCalledWith(`${baseApiUrl}/api/hotels`);
        expect(result).toEqual(hotels);
    });
    
    it("Should thrown an error 'Not Found' if the requested resource does not exist", async()=>{
        //Arrange
        const getStub = jest.spyOn(Axios, "get").mockRejectedValue(
            //mockeamos objeto "error", asignando a "response" un objeto con el "status"
            { response: { status: 404 } }
        );
        //Act
        try{ //Debemos capturar el error lanzado desde el switch
            await getHotelCollection();
        }
        catch(error){
            //Assert
            expect(getStub).toHaveBeenCalledWith(`${baseApiUrl}/api/hotels`);
            expect(error).toEqual("Not Found");
        }
    });

    it("Should thrown an error 'Forbidden' if the access to resource is denied", async()=>{
        //Arrange
        const getStub = jest.spyOn(Axios, "get").mockRejectedValue(
            { response: { status: 403 } }
        );
        //Act
        try{
            await getHotelCollection();
        }
        catch(error){
            //Assert
            expect(getStub).toHaveBeenCalledWith(`${baseApiUrl}/api/hotels`);
            expect(error).toEqual("Forbidden");
        }
    });

    it("Should thrown an error 'Network Error' if the server could not be reached", async()=>{
        //Arrange
        const getStub = jest.spyOn(Axios, "get").mockRejectedValue({});
        //Act
        try{
            await getHotelCollection();
        }
        catch(error){
            //Assert
            expect(getStub).toHaveBeenCalledWith(`${baseApiUrl}/api/hotels`);
            expect(error).toEqual("Network Error");
        }
    });

    it("Should thrown an error 'Unknown Error' if we get an unmanaged error code", async()=>{
        //Arrange
        const getStub = jest.spyOn(Axios, "get").mockRejectedValue(
            { response: { status: 303 } }
        );
        //Act
        try{
            await getHotelCollection();
        }
        catch(error){
            //Assert
            expect(getStub).toHaveBeenCalledWith(`${baseApiUrl}/api/hotels`);
            expect(error).toEqual("Unknown Error");
        }
    });
});