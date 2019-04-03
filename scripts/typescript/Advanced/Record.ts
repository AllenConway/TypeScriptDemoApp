namespace Record {

    // use an index signature when the keys are unknown and can be all possible string values
    const mappedTypeIndexSignature: { k: string; v: string } = {
        k: "1",
        v: "Allen"
    }

    // using the TypeScript Record type annotation
    enum Color {
        Red,
        Blue,
        Green
    }

    const mappedTypeRecord: Record<Color, string> = {
        [Color.Red]: "12345",
        [Color.Blue]: "",
        [Color.Green]: ""
    }

    const mappedTypeRecordUsingPartial: Partial<Record<Color, string>> = {
        [Color.Red]: "12345"
        // If Partial<T> is removed, this value wouldn't compile
        // [Color.Blue]: "",
        // [Color.Green]: ""
    }

}