import  { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import {GetAllUsersResponse} from "../../../types/graphql";


const resolvers: Resolvers = {
    Query: {
        GetAllUsers: async (_, args, { req }): Promise<GetAllUsersResponse> => {
            const users = await User.createQueryBuilder("user")
                            .select(["user.username", "user.email"])
                            .take(10)
                            .getMany();
            if (users) {
                return {
                    ok: true,
                    error: null,
                    users: users
                };
            } else {
                return {
                    ok: false,
                    error: "user not found",
                    users: null
                };
            }
        }
    }
};

export default resolvers;