namespace ReadonlyMappedType {

    interface AppConfig {
        readonly url: string;
        readonly useHttps: boolean;
        readonly appId: string;
        readonly connectionString: string;
    }

    // Initialization is acceptable
    let appConfig: AppConfig = {
        url: "https://www.mysite.com",
        useHttps: true,
        appId: "d394455e-435a-42b0-99ee-e9c24108c36d",
        connectionString: "Server=myServerAddress;Database=myDataBase;"
    }

    // Mutation of the original value is not acceptable when using readonly
    // appConfig.useHttps = false;

    // Using the original interface that's not readonly
    interface AppConfigNRO {
        url: string;
        useHttps: boolean;
        appId: string;
        connectionString: string;
    }

    let appConfigRO: Readonly<AppConfigNRO> = {
        url: "https://www.mysite.com",
        useHttps: true,
        appId: "d394455e-435a-42b0-99ee-e9c24108c36d",
        connectionString: "Server=myServerAddress;Database=myDataBase;"
    }

    // Again, mutation of the original value is not acceptable when using readonly
    // appConfigRO.useHttps = false;
}