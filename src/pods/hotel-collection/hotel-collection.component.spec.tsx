import * as React from 'react';
import { render } from "@testing-library/react";
import { HotelCollectionComponent } from "./hotel-collection.component";
import { HotelEntityVm } from "./hotel-collection.vm";
import { basePicturesUrl } from 'core';

describe("Hotel Collection Component specs", ()=>{
    it("Should display a div with one HotelCard child when receives a collection with one element - using childElementCount", ()=>{
        //Arrange
        const hotelCollection: HotelEntityVm[] = [{
            id : "0248058a-27e4-11e6-ace6-a9876eff01b3",
            picture: `${basePicturesUrl}/thumbnails/50947_264_t.jpg`,
            name: "Motif Seattle",
            description: "With a stay at Motif Seattle, you will be centrally located in Seattle",
            rating: 4,
            address: "1415 5th Ave"}
        ];
        //Act
        const {getByTestId} = render(<HotelCollectionComponent hotelCollection={hotelCollection}/>);
        const mainDiv = getByTestId("hcMaindiv") as HTMLDivElement;
        const element = mainDiv.firstElementChild;
        //Assert
        expect(mainDiv.childElementCount).toBe(1);
        expect(element).not.toBeNull();
    });

    it("Should display a div with n HotelCard children when receives a collection with n elements - using getAllByTestId", ()=>{
        //Arrange
        const hotelCollection: HotelEntityVm[] = [{
                id : "1",
                picture: `${basePicturesUrl}/thumbnails/50947_264_t.jpg`,
                name: "Motif Seattle",
                description: "With a stay at Motif Seattle, you will be centrally located in Seattle",
                rating: 4,
                address: "1415 5th Ave"},
            {
                id : "2",
                picture: `${basePicturesUrl}/thumbnails/50947_264_t.jpg`,
                name: "Motif Seattle",
                description: "With a stay at Motif Seattle, you will be centrally located in Seattle",
                rating: 4,
                address: "1415 5th Ave"}
        ];
        //Act
        const {getAllByTestId} = render(<HotelCollectionComponent hotelCollection={hotelCollection}/>);
        const elements = getAllByTestId("hotelCardElement");
        //Assert
        expect(elements.length).toBe(2);
    });

    it("Should display a div with no HotelCard children when receives an empty collection", ()=>{
        //Arrange
        const hotelCollection: HotelEntityVm[] = [];
        //Act
        const {getByTestId} = render(<HotelCollectionComponent hotelCollection={hotelCollection}/>);
        const mainDiv = getByTestId("hcMaindiv") as HTMLDivElement;
        const element = mainDiv.firstElementChild;
        //Assert
        expect(mainDiv.childElementCount).toBe(0);
        expect(element).toBeNull();
    });

    it("Should display a div with no HotelCard children when receives a null object", ()=>{
        //Arrange
        const hotelCollection: HotelEntityVm[] = null;
        //Act
        const {getByTestId} = render(<HotelCollectionComponent hotelCollection={hotelCollection}/>);
        const mainDiv = getByTestId("hcMaindiv") as HTMLDivElement;
        const element = mainDiv.firstElementChild;
        //Assert
        expect(mainDiv.childElementCount).toBe(0);
        expect(element).toBeNull();
    });

    it("Should display a div with no HotelCard children when receives an undefined object", ()=>{
        //Arrange
        const hotelCollection: HotelEntityVm[] = undefined;
        //Act
        const {getByTestId} = render(<HotelCollectionComponent hotelCollection={hotelCollection}/>);
        const mainDiv = getByTestId("hcMaindiv") as HTMLDivElement;
        const element = mainDiv.firstElementChild;
        //Assert
        expect(mainDiv.childElementCount).toBe(0);
        expect(element).toBeNull();
    });
});