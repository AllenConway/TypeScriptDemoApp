namespace RecordMappedType {

    // use an index signature when the keys are unknown and can be all possible string values
    const mappedTypeIndexSignature: { k: string; v: string } = {
        k: "1",
        v: "Allen"
    }
    
    enum Color {
        Red,
        Blue,
        Green
    }

     // using the TypeScript Record type annotation
     // restrict the key to a Color and a string as its corresponding value
    const mappedTypeRecord: Record<Color, string> = {
        [Color.Red]: "12345",
        [Color.Blue]: "",
        [Color.Green]: "",
        //[Color.Yellow]: ""
    }

    const mappedTypeRecordUsingPartial: Partial<Record<Color, string>> = {
        [Color.Red]: "12345",
        // If Partial<T> is removed, this value wouldn't compile
        // [Color.Blue]: "",
        [Color.Green]: ""
    }

}