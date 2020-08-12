import {
    QueryGetUserByUsernameArgs,
    GetUserByUsernameResponse
} from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";

const resolvers: Resolvers = {
    Query: {
        GetUserByUsername: async (_, args: QueryGetUserByUsernameArgs , { req }): Promise<GetUserByUsernameResponse> => {
            try {
                const { username } = args;
                const user = await User.createQueryBuilder("user")
                                    .select(["user.username, user.username"])
                                    .where(`user.username = ${username}`)
                                    .getOne()
                if (user) {
                    return {
                        ok: true,
                        error: null,
                        user: user
                    };
                } else {
                    return {
                        ok: false,
                        error: `${username} does not exist!`
                    }
                }
            } catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    user: null
                };
            }
        }
    }
};

export default resolvers;