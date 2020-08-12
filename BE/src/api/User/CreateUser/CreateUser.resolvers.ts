import { Resolvers } from "../../../types/resolvers";
import {MutationCreateUserArgs, CreateUserResponse} from "../../../types/graphql";
import User from "../../../entities/User";

const resolvers: Resolvers = {
    Mutation: {
        CreateUser: async (_, args: MutationCreateUserArgs): Promise<CreateUserResponse> => {
            try {
                await User.create({ ...args }).save();
                return {
                    ok: true,
                    error: null
                };
            } catch(error) {
                return {
                    ok: false,
                    error: error.message
                };
            }
        }
    }
};

export default resolvers;