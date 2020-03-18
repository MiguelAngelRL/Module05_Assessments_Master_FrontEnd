import { createEmptyLogin, LoginEntityVm } from "./login.vm";

describe("Login View Model specs", ()=>{
    it("Should return a LoginEntityVm object with empty login and password when createEmptyLogin is invoked", ()=>{
        //Arrange
        const expected: LoginEntityVm = {
            login: "",
            password: ""
        }
        //Act
        const result: LoginEntityVm = createEmptyLogin();
        //Assert
        expect(result).toEqual(expected);
    });
});