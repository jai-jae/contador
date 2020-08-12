import { Resolvers } from "../../../types/resolvers";
import { MutationSignInArgs, SignInResponse } from "../../../types/graphql";
import User from "../../../entities/User";
import encodeJWT from "../../../utils/encodeJWT";


const resolvers: Resolvers = {
    Mutation: {
        SignIn: async (_, args: MutationSignInArgs): Promise<SignInResponse> => {
            const { username, password } = args;
            try {
                const user = await User.findOne({ where: { username: username } })
                if (!user) {
                    return {
                        ok: false,
                        error: "please check your username.",
                        token: null
                    };
                }
                const checkPassword = await user.check_password(password);
                if (checkPassword) {
                    const token = encodeJWT(user.id);
                    return {
                        ok: true,
                        error: null,
                        token: token
                    };
                } else {
                    return {
                        ok: false,
                        error: "please check your password.",
                        token: null
                    };
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }
        }
    }
};

export default resolvers;