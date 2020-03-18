import * as React from 'react';
import { render } from "@testing-library/react";
import { HotelCard } from './hotel-card.component';
import { HotelEntityVm } from '../hotel-collection.vm';
import { basePicturesUrl } from 'core';
import * as materialStyles from "../../../../node_modules/@material-ui/styles";

describe("", ()=>{
    it("Should display an element with the data-testid feeded when HotelCard is rendered", ()=>{
        //Arrange
        const props = {
            hotel: {
                id : "0248058a-27e4-11e6-ace6-a9876eff01b3",
                picture: `${basePicturesUrl}/thumbnails/50947_264_t.jpg`,
                name: "Motif Seattle",
                description: "With a stay at Motif Seattle, you will be centrally located in Seattle",
                rating: 4,
                address: "1415 5th Ave"
            } as HotelEntityVm,
            "data-testid": "hotelCardId" as string
        }
        //Act
        const {getByTestId} = render(<HotelCard {...props}/>);
        const element = getByTestId("hotelCardId") as HTMLDivElement;
        //Assert
        expect(element).not.toBeNull();
    });

    it("Should display the properties within the object hotel except id when HotelCard is rendered", ()=>{
        //Arrange
        const props = {
            hotel: {
                id : "0248058a-27e4-11e6-ace6-a9876eff01b3",
                picture: `${basePicturesUrl}/thumbnails/50947_264_t.jpg`,
                name: "Motif Seattle",
                description: "With a stay at Motif Seattle, you will be centrally located in Seattle",
                rating: 4,
                address: "1415 5th Ave"
            } as HotelEntityVm,
            "data-testid": "hotelCardId" as string
        }
        //Act
        const {queryByText, queryByTitle} = render(<HotelCard {...props}/>);
        const elementId = queryByText(props.hotel.id);
        const elementPicture = queryByTitle(props.hotel.name) as HTMLDivElement;
        const elementName = queryByText(props.hotel.name);
        const elementDescription = queryByText(props.hotel.description);
        const elementRating = queryByText(`${props.hotel.rating}`);
        const elementAddress = queryByText(props.hotel.address);
        //Assert
        expect(elementPicture.style.backgroundImage.includes(props.hotel.picture)).toBeTruthy();
        expect(elementName).not.toBeNull();
        expect(elementDescription).not.toBeNull();
        expect(elementRating).not.toBeNull();
        expect(elementAddress).not.toBeNull();
        expect(elementId).toBeNull();
    });

    it("Should display two buttons when HotelCard is rendered", ()=>{
        //Arrange
        const props = {
            hotel: {
                id : "0248058a-27e4-11e6-ace6-a9876eff01b3",
                picture: `${basePicturesUrl}/thumbnails/50947_264_t.jpg`,
                name: "Motif Seattle",
                description: "With a stay at Motif Seattle, you will be centrally located in Seattle",
                rating: 4,
                address: "1415 5th Ave"
            } as HotelEntityVm,
            "data-testid": "hotelCardId" as string
        }

        //Act
        const {getByLabelText} = render(<HotelCard {...props}/>);
        const elementButton1 = getByLabelText("Add to favorites") as HTMLButtonElement;
        const elementButton2 = getByLabelText("Share") as HTMLButtonElement;
        //Assert
        expect(elementButton1).not.toBeNull();
        expect(elementButton2).not.toBeNull();
    });

    it("Should render an empty HotelCard if hotel is an empty HotelEntityVm", ()=>{
        //Arrange
        const props = {
            hotel: {} as HotelEntityVm,
            "data-testid": "hotelCardId" as string
        }
        //Act
        const {getByTestId, getByLabelText} = render(<HotelCard {...props}/>);
        const elementButton1 = getByLabelText("Add to favorites") as HTMLButtonElement;
        const elementButton2 = getByLabelText("Share") as HTMLButtonElement;
        const element = getByTestId("hotelCardId") as HTMLDivElement;
        //Assert
        expect(elementButton1).not.toBeNull();
        expect(elementButton2).not.toBeNull();
        expect(element).not.toBeNull();
    });

    it("Should render an empty HotelCard if hotel is null or undefined", ()=>{
        //Arrange
        const props = {
            hotel: null,
            "data-testid": "hotelCardId" as string
        }
        //Act
        const {getByTestId, getByLabelText} = render(<HotelCard {...props}/>);
        const elementButton1 = getByLabelText("Add to favorites") as HTMLButtonElement;
        const elementButton2 = getByLabelText("Share") as HTMLButtonElement;
        const element = getByTestId("hotelCardId") as HTMLDivElement;
        //Assert
        expect(elementButton1).not.toBeNull();
        expect(elementButton2).not.toBeNull();
        expect(element).not.toBeNull();
    });
});