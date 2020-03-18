import * as React from "react";
import {render, fireEvent, wait } from "@testing-library/react";
import { LoginComponent } from "./login.component";
import { LoginEntityVm } from "./login.vm";

describe("Login Component specs", ()=>{
    it("Should display a Field 'Name', a Field 'Password' and a Button when is rendered", async()=>{
        //Arrange
        const props = {
            onLogin: ()=>{}, 
            initialLogin: {} as LoginEntityVm
        }
        //Act
        const { getByText } = await (render(<LoginComponent {...props}/>));
        const nameFieldElement = getByText("Name");
        const passFieldElement = getByText("Password");
        const buttonElement = getByText("Press to Login");
        //Assert
        expect(nameFieldElement).toBeInTheDocument();
        expect(passFieldElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    });

    it("Should display an initial login and password if them are informed within the initialLogin object", async()=>{
        //Arrange
        const props = {
            onLogin: ()=>{}, 
            initialLogin: {login: "username", password: "keypass"}
        }
        //Act
        const { getByTestId } = await (render(<LoginComponent {...props}/>));
        const nameFieldElement = getByTestId("userLogin") as HTMLInputElement;
        const passFieldElement = getByTestId("userPass") as HTMLInputElement;
        //Assert
        expect(nameFieldElement).toBeInTheDocument();
        expect(passFieldElement).toBeInTheDocument();
        expect(nameFieldElement.value).toEqual("username");
        expect(passFieldElement.value).toEqual("keypass");
    });

    it("Should call the onLogin function when login and password fields are not empty and the button \
is clicked (launching submit event)", async()=>{
        //Arrange
        const props = {
            onLogin: jest.fn(),
            initialLogin: {login: "whatever", password: "whatever"}
        }
        //Act
        const { getByTestId } = render(<LoginComponent {...props}/>);
        const buttonElement = getByTestId("button");
        await wait(()=>fireEvent.submit(buttonElement));
        //Assert
        expect(props.onLogin).toHaveBeenCalled();
    });

    it("Should not call the onLogin function when login and/or password fields are empty and the button \
is clicked (launching submit event)", async()=>{
        //Arrange
        const props = {
            onLogin: jest.fn(),
            initialLogin: {login: "", password:""}
        }
        //Act
        const { getByTestId } = await (render(<LoginComponent {...props}/>));
        const buttonElement = getByTestId("button");
        await wait(()=>fireEvent.submit(buttonElement));
        //Assert
        expect(props.onLogin).not.toHaveBeenCalled();
    });    
});