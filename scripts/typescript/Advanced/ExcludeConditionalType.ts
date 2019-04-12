// namespace ExcludeConditionalTypes { 

//     enum Fruits {
//         apple = 1,
//         pear = 2,
//         bananna = 3,
//         blueberry = 4,
//         cantelope = 5,
//         strawberry = 6,
//         peach = 7
//     }

//     enum Fruits2 {
//         apple = 1,
//     }
    
//     type User = {
//         id: string;
//         firstName: string;
//         lastName: string;
//         phone: number;
//         isAdmin: boolean;
//       };

//     type User2 = {
//         id: string;
//         isAdmin: boolean;
//     }  

//     type standardUser = Exclude<User, 'isAdmin'>;
      
//     type fruits = ['apple', 'pear'];
//     type fruit = Exclude<fruits, 'apple'>;

//     type r = Exclude<User, "id" | "registeredAt">;
//     type rq = Extract<User, string>;
//     type t = Pick<User, "name" | "location">;
    
//       type fruits2 = Exclude<Fruits, Fruits2>;

//     type Engine = {
//         cylinders: number;
//         blockType: string;
//         horsepower: number;
//         oilCapacity: number;
//         coolantCapacity: number;
//         powerSteeringCapacity: number;
//         differentialCapcity: number;
//         transmissionCapacity: number;
//        };

//     type Engine2 = {
//         cylinders: number;
//         blockType: string;
//         someNewValue: boolean;
//        };


//     type lessEngine = Omit<Engine, "cylinders" | "blockType">;
//     type lessEngine2 = Exclude<Engine2, Engine>;
//     let myEngine:lessEngine = {
//         horsepower: 1,
//         oilCapacity: 1,
//         coolantCapacity: 1,
//         powerSteeringCapacity: 1,
//         differentialCapcity: 1,
//         transmissionCapacity: 1
//     }

//     let myEngine2:lessEngine2 = {
//         horsepower: 1,
//         oilCapacity: 1,
//         coolantCapacity: 1,
//         powerSteeringCapacity: 1,
//         differentialCapcity: 1
//     }
    
//     type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;
//     type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
//     type WinterFruits = Exclude<Fruits, 'apple' | 'peach' | 'pear'>;


//     function ListWinterFruits(winterFruits: WinterFruits[]) {
//         winterFruits.forEach(fruit => console.log(Fruits[fruit]));
//     }

//     let fruitSelection: WinterFruits[] = [Fruits.blueberry, Fruits.cantelope];
//     let fruitSelectionInvalid: WinterFruits[] = [Fruits.blueberry, Fruits.peach];
//     ListWinterFruits(fruitSelection);
// }