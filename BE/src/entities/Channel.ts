import {
    BaseEntity,
    CreateDateColumn,
    Entity, 
    OneToMany,
    Column,
    PrimaryGeneratedColumn, 
    UpdateDateColumn,
} from "typeorm";
import Member from "./Member";
import Message from "./Message";


@Entity()
class Channel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToMany(type => Message, message => message.channel)
    messages: Message[];

    @Column({type: "text", nullable: false, unique: true })
    name: string;

    // @ManyToMany(type => User, user => user.channels, { cascade: true })
    // @JoinTable()
    // users: User[]

    @OneToMany(type => Member, member => member.channel)
    members: Member[];

    @Column({ type: "boolean", default: false, nullable: false})
    shared: boolean;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}

export default Channel;