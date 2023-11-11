import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "user_tasks", schema: "main" })
export class Tasks {
    @PrimaryGeneratedColumn()
    task_id!: number

    @Column("text")
    task_name!: string

    @Column("int", { default: 0 })
    completed!: number

    @Column({ type: "text", default: () => "CURRENT_TIMESTAMP" })
    created_timestamp!: Date

    @Column("text", { nullable: true })
    completed_timestamp!: Date
}
