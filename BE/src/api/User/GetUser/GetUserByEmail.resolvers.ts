import {
    QueryGetUserByEmailArgs,
    GetUserByEmailResponse
} from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";

const resolvers: Resolvers = {
    Query: {
        GetUserByEmail: async (_, args: QueryGetUserByEmailArgs , { req }): Promise<GetUserByEmailResponse> => {
            try {
                const { email } = args;
                const user = await User.createQueryBuilder("user")
                                    .select(["user.username, user.email"])
                                    .where(`user.email = ${email}`)
                                    .getOne();
                if (user) {
                    return {
                        ok: true,
                        error: null,
                        user: user
                    };
                } else {
                    return {
                        ok: false,
                        error: `${email} does not exist!`
                    };
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