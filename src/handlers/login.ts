/**
 * Login
 *
 * @packageDocumentation
 */

import 'source-map-support/register';
import * as LambdaUtils from '@sailplane/lambda-utils';
import * as createError from 'http-errors';
import { RegisterUserParams, UserLoginResponse } from '../types/auth.types';
import { Injector } from '@sailplane/injector';
import AuthService from '../services/auth.service';

const authService = Injector.get(AuthService);

/** AWS Lambda entrypoint */
export const handler = LambdaUtils.wrapApiHandler(
  async (event: LambdaUtils.APIGatewayProxyEvent) => {
    const params: RegisterUserParams = event.body;

    try {
      const response: UserLoginResponse = await authService!.loginUser(params)!;
      return {
        statusCode: 200,
        body: JSON.stringify({
          token: response.token
        })
      };
    } catch (e) {
      throw new createError.InternalServerError(
        'Server under maintenance! try again later!'
      );
    }
  }
);
