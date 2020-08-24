import {
    BaseEntity,
    Column,
    Entity, 
    ManyToOne,
    UpdateDateColumn,
    CreateDateColumn,
    PrimaryColumn
} from "typeorm";
import User from "./User";
import Channel from "./Channel";
import { memberTypes} from "../types/types";

const OWNER = "OWNER"
const ADMIN = "ADMIN"
const MODERATOR = "MODERATOR"
const MEMBER = "MEMBER"

// M : N bridge-table for Channel and User

@Entity()
class Member extends BaseEntity {
    @PrimaryColumn()
    userId: number;
    @ManyToOne(type => User, user => user.members)
    user: User;
    
    @PrimaryColumn()
    channelId: number;
    @ManyToOne(type => Channel, channel => channel.members, {onDelete: 'CASCADE'})
    channel: Channel;

    @Column({ type: "text", nullable: false, enum: [OWNER, ADMIN, MODERATOR, MEMBER] })
    kind: memberTypes;

    @CreateDateColumn()
    createdAt: string;
    
    @UpdateDateColumn()
    updatedAt: string;
}

export default Member;