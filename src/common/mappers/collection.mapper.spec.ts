import * as collectionMapper from "./collection.mapper";

describe("Hotel Collection Mapper specs", () =>{
    it("Should return empty array when receive an undefined collection", ()=>{
        //Arrange
        const collection: [any] = undefined;
        const mapFn = () => {};
        const expectedResult = <any>[];
        //Act
        const result: any[] = collectionMapper.mapToCollection(collection, mapFn);
        //Assert
        expect(result).toEqual(expectedResult);

    });

    it("Should return empty array when receive a null collection", ()=>{
        //Arrange
        const collection: any[] = null;
        const mapFn = () => {};
        const expectedResult = <any>[];
        //Act
        const result: any[] = collectionMapper.mapToCollection(collection, mapFn);
        //Assert
        expect(result).toEqual(expectedResult);

    });

    it("Should return empty array when receive an empty collection", ()=>{
        //Arrange
        const collection: any[] = <any>[];
        const mapFn = () => {};
        const expectedResult = <any>[];
        //Act
        const result: any[] = collectionMapper.mapToCollection(collection, mapFn);
        //Assert
        expect(result).toEqual(expectedResult);
    });

    it("Should call mapFn when receive a populated array", ()=>{
        //Arrange
        const collection: any[] = [{name:'test1'}, {name:'test2'}, {name:'test3'}];
        const mapFn = jest.fn();
        //Act
        const result: any[] = collectionMapper.mapToCollection(collection, mapFn);
        //Assert
        expect(mapFn).toHaveBeenCalled();
    });

    it("Should call mapFn 3 times when receive an array with 3 objects", ()=>{
        //Arrange
        const collection: any[] = [{name:'test1'}, {name:'test2'}, {name:'test3'}];
        const mapFn = jest.fn();
        //Act
        const result: any[] = collectionMapper.mapToCollection(collection, mapFn);
        //Assert
        expect(mapFn).toHaveBeenCalledTimes(3);
    });

    it("Should return an array with 3 mapped objects when receive a collection with 3 objects", ()=>{
        //Arrange
        const collection: any[] = [{name:'test1'}, {name:'test2'}, {name:'test3'}];
        const mapFn = () => {};
        //Act
        const result: any[] = collectionMapper.mapToCollection(collection, mapFn);
        //Assert
        expect(result.length).toBe(3);
    });
})