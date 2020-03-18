import * as React from 'react';
import { render } from "@testing-library/react";
import { HotelCollectionContainer } from "./hotel-collection.container";
import * as hook from './hotel-collection.hook';
import { HotelEntityVm } from './hotel-collection.vm';
import { basePicturesUrl } from 'core';

describe("Hotel Collection Container specs", ()=>{
    it("The function returned by the hook, should be called just once when the component is renderized", ()=>{
        //Arrange
        const hotelCollection: HotelEntityVm[] = [{
            id : "0248058a-27e4-11e6-ace6-a9876eff01b3",
            picture: `${basePicturesUrl}/thumbnails/50947_264_t.jpg`,
            name: "Motif Seattle",
            description: "With a stay at Motif Seattle, you will be centrally located in Seattle",
            rating: 4,
            address: "1415 5th Ave"}
        ];
        const loadHotelCollection = jest.fn();
        jest.spyOn(hook, "useHotelCollection").mockReturnValue({
            hotelCollection,
            loadHotelCollection
        })
        //Act
        render(<HotelCollectionContainer />);
        //Assert
        expect(loadHotelCollection).toHaveBeenCalled();
        expect(loadHotelCollection).toHaveBeenCalledTimes(1);
    });

    it("Should display a div with one HotelCard child when the hook returns a collection with one element", ()=>{
        //Arrange
        const hotelCollection: HotelEntityVm[] = [{
            id : "0248058a-27e4-11e6-ace6-a9876eff01b3",
            picture: `${basePicturesUrl}/thumbnails/50947_264_t.jpg`,
            name: "Motif Seattle",
            description: "With a stay at Motif Seattle, you will be centrally located in Seattle",
            rating: 4,
            address: "1415 5th Ave"}
        ];
        const loadHotelCollection = jest.fn();
        jest.spyOn(hook, "useHotelCollection").mockReturnValue({
            hotelCollection,
            loadHotelCollection
        })
        //Act
        const {getByTestId} = render(<HotelCollectionContainer />);
        const mainDiv = getByTestId("hcMaindiv") as HTMLDivElement;
        const element = mainDiv.firstElementChild;
        //Assert
        expect(mainDiv.childElementCount).toBe(1);
        expect(element).not.toBeNull();
    });

    it("Should display a div with no HotelCard children when the hook returns an empty collection", ()=>{
        //Arrange
        const hotelCollection: HotelEntityVm[] = [];
        const loadHotelCollection = jest.fn();
        jest.spyOn(hook, "useHotelCollection").mockReturnValue({
            hotelCollection,
            loadHotelCollection
        })
        //Act
        const {getByTestId} = render(<HotelCollectionContainer />);
        const mainDiv = getByTestId("hcMaindiv") as HTMLDivElement;
        const element = mainDiv.firstElementChild;
        //Assert
        expect(mainDiv.childElementCount).toBe(0);
        expect(element).toBeNull();
    });

    it("Should display a div with no HotelCard children when the hook returns a null collection", ()=>{
        //Arrange
        const hotelCollection: HotelEntityVm[] = null;
        const loadHotelCollection = jest.fn();
        jest.spyOn(hook, "useHotelCollection").mockReturnValue({
            hotelCollection,
            loadHotelCollection
        })
        //Act
        const {getByTestId} = render(<HotelCollectionContainer />);
        const mainDiv = getByTestId("hcMaindiv") as HTMLDivElement;
        const element = mainDiv.firstElementChild;
        //Assert
        expect(mainDiv.childElementCount).toBe(0);
        expect(element).toBeNull();
    });

    it("Should display a div with no HotelCard children when the hook returns an undefined collection", ()=>{
        //Arrange
        const hotelCollection: HotelEntityVm[] = undefined;
        const loadHotelCollection = jest.fn();
        jest.spyOn(hook, "useHotelCollection").mockReturnValue({
            hotelCollection,
            loadHotelCollection
        })
        //Act
        const {getByTestId} = render(<HotelCollectionContainer />);
        const mainDiv = getByTestId("hcMaindiv") as HTMLDivElement;
        const element = mainDiv.firstElementChild;
        //Assert
        expect(mainDiv.childElementCount).toBe(0);
        expect(element).toBeNull();
    });

    it("Should display a div with no HotelCard children when the hook returns a null load function", ()=>{
        //Arrange
        const hotelCollection: HotelEntityVm[] = null;
        const loadHotelCollection = null;
        jest.spyOn(hook, "useHotelCollection").mockReturnValue({
            hotelCollection,
            loadHotelCollection
        })
        //Act
        const {getByTestId} = render(<HotelCollectionContainer />);
        const mainDiv = getByTestId("hcMaindiv") as HTMLDivElement;
        const element = mainDiv.firstElementChild;
        //Assert
        expect(mainDiv.childElementCount).toBe(0);
        expect(element).toBeNull();
    });
});