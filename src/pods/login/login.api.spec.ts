import { validateCredentials } from "./login.api";


describe("Login Api specs", ()=>{
    it("Should return true when the credentials are correct", async()=>{
        //Arrange
        const credentials = {user: "admin", password: "test"}
        //Act
        const result = await(validateCredentials(credentials.user, credentials.password).then(resolve=>resolve));
        //Assert
        expect(result).toBeTruthy();
    });

    it("Should return false when any part of the credentials is incorrect", async()=>{
        //Arrange
        const credentials = {user: "whatever", password: "test"}
        //Act
        const result = await(validateCredentials(credentials.user, credentials.password).then(resolve=>resolve));
        //Assert
        expect(result).toBeFalsy();
    });
});