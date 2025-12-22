import {Amplify} from 'aws-amplify'
import {SignInOutput, fetchAuthSession, signIn} from '@aws-amplify/auth'

const AWS_REGION = 'eu-west-2'


Amplify.configure({
  Auth: {
    // extract these value from the UI
   Cognito: {
    userPoolId: 'eu-west-2_qcrsl8aSb',
    userPoolClientId: '14pf06359tmc6sg9rb6uh0h2ml',

   }
  }
})

export class AuthServices {
    public async login(userName: string, password: string) {
        const signInOutput : SignInOutput = await signIn({
            username:userName,
            password:password,
            options:{
                authFlow: 'USER_PASSWORD_AUTH',
            }
        })
        return signInOutput
    }

    public async getIdToken(){
        const authSession = await fetchAuthSession();
        return authSession.tokens?.idToken?.toString();
    }
}