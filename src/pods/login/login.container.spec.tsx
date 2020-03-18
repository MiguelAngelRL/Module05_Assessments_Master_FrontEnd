import * as React from "react";
import { render, fireEvent, wait, act } from "@testing-library/react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { LoginContainer } from "./login.container";
import { linkRoutes, basePicturesUrl } from "core";
import { HotelCollectionContainer } from "pods/hotel-collection";
import * as loginvm from "./login.vm"
import { HotelEntityVm } from "pods/hotel-collection/hotel-collection.vm";
import * as loginApi from "../login/login.api";
import * as hotelCollectionApi from "../hotel-collection/hotel-collection.api";
import { HotelCollectionScene } from "scenes";

describe("", ()=>{

    it("Should display a Field 'Name', a Field 'Password' and a Button when is rendered", ()=>{
        //Arrange
        const renderWithRouter = component => {
            return {
                ...render(
                    <HashRouter>
                        <Switch>
                            <Route
                                path={linkRoutes.hotelCollection}
                                component={HotelCollectionScene}
                            />
                        </Switch>
                        {component}
                    </HashRouter>
                )
            }
        }
        //Act
        const { getByTestId } = (renderWithRouter(<LoginContainer/>));
        const nameFieldElement = getByTestId("userLogin") as HTMLInputElement;
        const passFieldElement = getByTestId("userPass") as HTMLInputElement;
        const buttonElement = getByTestId("button");
        // //Assert
        expect(nameFieldElement).toBeInTheDocument();
        expect(passFieldElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    });

    it("Should call createEmptyLogin when is rendered", ()=>{
        //Arrange
        const renderWithRouter = component => {
            return {
                ...render(
                    <HashRouter>
                        <Switch>
                            <Route
                                path={linkRoutes.hotelCollection}
                                component={HotelCollectionScene}
                            />
                        </Switch>
                        {component}
                    </HashRouter>
                )
            }
        }
        const createEmptyLogin = jest.spyOn(loginvm, "createEmptyLogin").mockImplementation(()=>({login:"", password:""}));
        //Act
        const { getByTestId } = (renderWithRouter(<LoginContainer/>));
        const nameFieldElement = getByTestId("userLogin") as HTMLInputElement;
        // //Assert
        expect(nameFieldElement).toBeInTheDocument();
        expect(createEmptyLogin).toHaveBeenCalled();
    });

    it("Should navigate to '/hotel-collection' and display a div with data-testid='maindiv' when the button is clicked\
and the login credentials are correct (validateCredentials return a true value)", async()=>{
        const renderWithRouter = component => {
            return {
                ...render(
                    <HashRouter>
                        <Switch>
                            <Route
                                path={linkRoutes.hotelCollection}
                                component={HotelCollectionScene}
                            />
                        </Switch>
                        {component}
                    </HashRouter>
                )
            }
        }
        const hotels: hotelCollectionApi.HotelEntityApi[] = [{
            id:"1234",
            name: 'My test hotel',
            hotelRating: 4
        } as unknown as hotelCollectionApi.HotelEntityApi
        ];
        jest.spyOn(loginApi, "validateCredentials").mockResolvedValue(true);
        jest.spyOn(hotelCollectionApi, "getHotelCollection").mockResolvedValue(hotels);
        
        

        //Act
        const { getByTestId, queryByTestId } = (renderWithRouter(<LoginContainer/>));
        const nameFieldElement = getByTestId("userLogin") as HTMLInputElement;
        const passFieldElement = getByTestId("userPass") as HTMLInputElement;
        const buttonElement = getByTestId("button");
        fireEvent.change(nameFieldElement, { //lanzamos un evento change sobre el elemento HTML deseado
            target: {
                value: "whatever" //element.target.value
            }
        });
        fireEvent.change(passFieldElement, { //lanzamos un evento change sobre el elemento HTML deseado
            target: {
                value: "whatever" //element.target.value
            }
        });

        await wait(()=>fireEvent.submit(buttonElement));
        const element = queryByTestId("hcMaindiv");
        
        //Assert
        expect(element).toBeInTheDocument();
    });

    it("Should show an alert message if the credentials are not valid", async()=>{
        const renderWithRouter = component => {
            return {
                ...render(
                    <HashRouter>
                        <Switch>
                            <Route
                                path={linkRoutes.hotelCollection}
                                component={HotelCollectionScene}
                            />
                        </Switch>
                        {component}
                    </HashRouter>
                )
            }
        }
        jest.spyOn(loginApi, "validateCredentials").mockResolvedValue(false);
        const alertStub = jest.spyOn(window, "alert");

        //Act
        const { getByTestId } = (renderWithRouter(<LoginContainer/>));
        const nameFieldElement = getByTestId("userLogin") as HTMLInputElement;
        const passFieldElement = getByTestId("userPass") as HTMLInputElement;
        const buttonElement = getByTestId("button");
        fireEvent.change(nameFieldElement, { //lanzamos un evento change sobre el elemento HTML deseado
            target: {
                value: "whatever" //element.target.value
            }
        });
        fireEvent.change(passFieldElement, { //lanzamos un evento change sobre el elemento HTML deseado
            target: {
                value: "whatever" //element.target.value
            }
        });
        await wait(()=>fireEvent.submit(buttonElement));
        
        //Assert
        expect(alertStub).toHaveBeenCalled();
    });    

});


