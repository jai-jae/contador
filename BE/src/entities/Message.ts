import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    Column, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from "typeorm";

import Channel from "./Channel";
import User from "./User";

@Entity() 
class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => Channel, channel => channel.messages, {nullable: false})
    channel: Channel;
    @Column()
    channelId: number;

    @Column({ type: "text" })
    content: string;

    @ManyToOne(type => User, user => user.messages, {nullable: false})
    sender: User;
    @Column()
    senderId: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}

export default Message;