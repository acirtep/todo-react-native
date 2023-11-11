import "reflect-metadata"
import { DataSource } from "typeorm"
import { Tasks } from "./models/Tasks"

export const AppDataSource = new DataSource({
    type: "expo",
    database: "db.db",
    entities: [Tasks],
    synchronize: true,
    logging: true,
    migrations: ["./database/migrations/*.ts"],
    migrationsTableName: "typeorm_migration_table",
    driver: require("expo-sqlite"),
})

AppDataSource.initialize()
    .then(() => {
        console.log("Connection initialized with database...")
    })
    .catch((error) => console.log(error))
