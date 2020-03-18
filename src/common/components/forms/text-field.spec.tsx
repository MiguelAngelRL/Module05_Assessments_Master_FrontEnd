import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { TextField } from "./text-field";
import { FieldInputProps } from 'react-final-form';

describe("TexField component specs", () => {
    it("Should display the text received by props in an INPUT tag element - using getByDisplayValue", () => {
        //Arrange
        const textTyped = "The Text Typed";
        const props = { 
            input: {
                value: textTyped, 
                onChange: ()=>{}, 
                name:"inputName"
            } as unknown as FieldInputProps<any,any>, 
            meta:"",
            "data-testid": "testComponent"
        };
        //Act
        const {getByDisplayValue} = render(<TextField {...props}/>);
        const element = getByDisplayValue("The Text Typed") as HTMLInputElement;
        //Assert
        expect(element).not.toBeNull();
        expect(element.tagName).toEqual("INPUT");
        expect(element.name).toEqual("inputName");
    });

    it("Should display the text received by props in an INPUT tag element - using getByTestId", () => {
        //Arrange
        const textTyped = "The Text Typed";
        const props = { 
            input: {
                value: textTyped, 
                onChange: ()=>{}, 
                name:"inputName"
            } as unknown as FieldInputProps<any,any>, 
            meta:"",
            "data-testid": "testComponent"
        };
        //Act
        const {getByTestId} = render(<TextField {...props}/>);
        const element = getByTestId("testComponent") as HTMLInputElement;
        //Assert
        expect(element).not.toBeNull();
        expect(element.tagName).toEqual("INPUT");
        expect(element.value).toEqual("The Text Typed");
        expect(element.name).toEqual("inputName");
    });

    it("Should display an empty INPUT when nothing has been received by props- using getByTestId", () => {
        //Arrange
        const props = { 
            input: {
                name:"inputName"
            } as unknown as FieldInputProps<any,any>, 
            meta:"",
            "data-testid": "testComponent"
        };
        //Act
        const {getByTestId} = render(<TextField {...props}/>);
        const element = getByTestId("testComponent") as HTMLInputElement;
        //Assert
        expect(element).not.toBeNull();
        expect(element.tagName).toEqual("INPUT");
        expect(element.value).toEqual("");
        expect(element.name).toEqual("inputName");
    });

    it("Should display the text received by props in an INPUT tag element - using snapshot", () => {
        //Arrange
        const textTyped = "The Text Typed";
        const props = { 
            input: {
                value: textTyped, 
                onChange: ()=>{}, 
                name:"inputName"
            } as unknown as FieldInputProps<any,any>, 
            meta:"",
            "data-testid": "testComponent"
        };
        //Act
        const {asFragment} = render(<TextField {...props}/>);
        //Assert
        expect(asFragment()).toMatchSnapshot();
    });

    it("Should display the text received by props in an INPUT tag element - using jest-dom", () => {
        //Arrange
        const textTyped = "The Text Typed";
        const props = { 
            input: {
                value: textTyped, 
                onChange: ()=>{}, 
                name:"inputName"
            } as unknown as FieldInputProps<any,any>, 
            meta:"",
            "data-testid": "testComponent"
        };
        //Act
        const {getByTestId} = render(<TextField {...props}/>);
        const element = getByTestId("testComponent") as HTMLInputElement;
        //Assert
        expect(element).toBeInTheDocument();
    });

    it("Should display the text typed by the user and the onChange function should be called - using getByTestId and fireEvent", () => {
        //Arrange
        const props = { 
            input: {
                onChange: jest.fn(),  
                name:"inputName"
            } as unknown as FieldInputProps<any,any>, 
            meta:"",
            "data-testid": "testComponent"
        };
        //Act
        const {getByTestId} = render(<TextField {...props}/>);
        const element = getByTestId("testComponent") as HTMLInputElement;
        fireEvent.change(element, { //lanzamos un evento change sobre el elemento HTML deseado
            target: {
                value: "Pepe" //element.target.value
            }
        });
        //Assert
        expect(element).not.toBeNull();
        expect(element.tagName).toEqual("INPUT");
        expect(element.value).toEqual("Pepe");
        expect(element.name).toEqual("inputName");
        expect(props.input.onChange).toBeCalled();
    });

    it("The property helperText must hold the meta.error message if meta.error and meta.touched are \
true - using getByTestId", () => {
        //Arrange
        const props = { 
            input: {
                name:"inputName"
            } as unknown as FieldInputProps<any,any>, 
            meta: {
                error: "The error message",
                touched: true
            },
            "data-testid": "testComponent"
        };
        //Act
        const { getByText } = render(<TextField {...props}/>);
        const element = getByText("The error message") as HTMLParagraphElement;
    
        //Assert
        expect(element).not.toBeNull();
        expect(element.tagName).toEqual("P");
        expect(element).toHaveClass("MuiFormHelperText-root");
        expect(element.innerHTML).toEqual("The error message");
    });

    it("The property helperText must hold the meta.error message if meta.submitError, meta.dirtySinceLastSubmit and \
meta.touched are true - using getByTestId", () => {
        //Arrange
        const props = { 
            input: {
                name:"inputName"
            } as unknown as FieldInputProps<any,any>, 
            meta: {
                submitError: true,
                dirtySinceLastSubmit: true,
                error: "The error message",
                touched: true
            },
            "data-testid": "testComponent"
        };
        //Act
        const { getByText } = render(<TextField {...props}/>);
        const element = getByText("The error message") as HTMLParagraphElement;
    
        //Assert
        expect(element).not.toBeNull();
        expect(element.tagName).toEqual("P");
        expect(element).toHaveClass("MuiFormHelperText-root");
        expect(element.innerHTML).toEqual("The error message");
    });
});