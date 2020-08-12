import  { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import {QueryGetUserByIdArgs, GetUserByIdResponse} from "../../../types/graphql";


const resolvers: Resolvers = {
    Query: {
        GetUserById: async (_, args: QueryGetUserByIdArgs, { req }): Promise<GetUserByIdResponse> => {
            const id  = args.id;
            const user = await User.findOne({where: { id }});
            if (user) {
                return {
                    ok: true,
                    error: null,
                    user: user
                };
            } else {
                return {
                    ok: false,
                    error: "user not found",
                    user: null
                };
            }
        }
    }
};

export default resolvers;