export interface ApplicationConfig{
    apiPort:number,
    environment:string,
    cors:CorsConfig,
    dbConfig?:DbConfig,
    loggingConfig?:LoggingConfig
}

export interface CorsConfig {
    allowedOrigins: string;
    allowedMethods: string;
}

export interface DbConfig {
    host: string,
    dbName: string,
    username: string,
    password: string
}

export interface LoggingConfig {
    enabled: boolean,
    level: number,
    type: string,
    api_key: string,
}