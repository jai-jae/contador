import {
    BaseEntity,
    CreateDateColumn,
    Entity, 
    OneToMany,
    Column,
    PrimaryGeneratedColumn, 
    UpdateDateColumn,
    JoinTable,
    ManyToMany,
} from "typeorm";
import Message from "./Message";
import User from "./User";


@Entity()
class Channel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToMany(type => Message, message => message.channel)
    messages: Message[];

    @Column({type: "text", nullable: false })
    name: string;

    @ManyToMany(type => User, user => user.channels, { cascade: true })
    @JoinTable()
    users: User[]

    @Column({ type: "boolean", default: false, nullable: false})
    shared: boolean;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}

export default Channel;