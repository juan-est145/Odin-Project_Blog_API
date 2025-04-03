/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/v1/posts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["PostsController_getPosts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/posts/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["PostsController_getPostId"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/posts/{id}/comments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["PostsController_getPostComments"];
        put?: never;
        post: operations["PostsController_postPostComment"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/log-in": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_logIn"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/auth/sign-in": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["AuthController_signIn"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/accnt/comments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AccntController_getComments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/accnt/posts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AccntController_getAccntPosts"];
        put?: never;
        post: operations["AccntController_createPost"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/accnt/upgrade": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["AccntController_getRole"];
        put?: never;
        post: operations["AccntController_upgradeAccnt"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/accnt/comments/{commentId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put: operations["AccntController_updateComment"];
        post?: never;
        delete: operations["AccntController_deleteComment"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/accnt/posts/{postId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put: operations["AccntController_updatePost"];
        post?: never;
        delete: operations["AccntController_deletePost"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        PostDto: {
            title: string;
            id: string;
            userId: number;
            subtitle: string | null;
            text: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
            published: boolean;
        };
        InvalidRequestErrorDto: {
            /** @example 400 */
            statusCode: number;
            /** @example Bad Request */
            message: string[];
            /** @example Validation failed */
            error: string;
        };
        NotFoundErrorDto: {
            /** @example 404 */
            statusCode: number;
            /** @example Not found */
            message: string;
        };
        CommentDto: {
            id: string;
            userId: number;
            postId: string;
            text: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
            username?: string;
        };
        ForbiddenRequestErrorDto: {
            /** @example 403 */
            statusCode: number;
            /** @example Forbidden resource */
            message: string;
            /** @example Forbidden */
            error: string;
        };
        PostCommentsDto: {
            /** @description The content of the comment */
            text: string;
        };
        LogInBodyDto: {
            username: string;
            password: string;
        };
        LogInResDto: {
            /** @example eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzA4MzQ1MTIzLCJleHAiOjE3MDgzNTUxMjN9 */
            token: string;
        };
        LogInBadRequestDto: {
            /** @example 400 */
            statusCode: number;
            /** @example Password is not strong enough */
            message: string[];
            /** @example Bad request */
            error: string;
        };
        LogInUnauthorizedDto: {
            /** @example 401 */
            statusCode: number;
            /** @example Unauthorized */
            message: string[];
        };
        SignInBodyDto: {
            username: string;
            /** @description A password that needs to have a min length of 8, and one of each of the following properties: a lowercase and uppercase letter and a special symbol */
            password: string;
            /** @description A confirmation field for the password */
            confPass: string;
        };
        SignInResDto: {
            username: string;
            /** @default 201 */
            statusCode: number;
        };
        SignInBadRequestDto: {
            /** @example 400 */
            statusCode: number;
            /** @example Passwords do not match */
            message: string[];
            /** @example Bad request */
            error: string;
        };
        SignInConflictResponseDto: {
            /** @example 409 */
            statusCode: number;
            /** @example Username is already taken */
            message: string;
        };
        AccntCommentsDto: {
            id: string;
            userId: number;
            postId: string;
            text: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
            postTitle: string;
        };
        UpgradeAccntRes: {
            /** @enum {string} */
            role: "USER" | "POSTER";
        };
        CreatePostBodyDto: {
            title: string;
            subtitle?: string;
            text: string;
            /**
             * @description Indicates whether the post should be published. Accepts 'true', 'false', '1', or '0'.
             * @enum {string}
             */
            publish: "true" | "false" | "1" | "0";
        };
        UpgradeAccntBodyDto: {
            passCode: string;
        };
        DeleteCommentRes: {
            /** @example 200 */
            code: number;
            message: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    PostsController_getPosts: {
        parameters: {
            query?: {
                /** @description The number of posts you wished returned. It must be a positive number, and if it exceeds the total amount of posts, it returns all of them */
                nmbOfPosts?: number;
                /** @description If present returns either only either published posts or non-published posts. Leave empty if you want all of them */
                published?: boolean;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Returns a collection of posts. The default value is 10. If a higher value is specified, it returns the maximum amount of posts there is */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostDto"][];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvalidRequestErrorDto"];
                };
            };
        };
    };
    PostsController_getPostId: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The id of the post */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Returns the post that matches the provided id */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostDto"];
                };
            };
            /** @description Returns an invalid message if the id is not a UUID */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvalidRequestErrorDto"];
                };
            };
            /** @description Returns a not found message if the id does not exist */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NotFoundErrorDto"];
                };
            };
        };
    };
    PostsController_getPostComments: {
        parameters: {
            query?: {
                /** @description The number of comments you wished returned. It must be a positive number, and if it exceeds the total amount of comments, it returns all of them */
                nmbOfCmnts?: number;
            };
            header?: never;
            path: {
                /** @description The id of the post */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Returns an array of comments */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CommentDto"][];
                };
            };
            /** @description Returns an error if not using jwt or an invalid one */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenRequestErrorDto"];
                };
            };
        };
    };
    PostsController_postPostComment: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The id of the post */
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostCommentsDto"];
            };
        };
        responses: {
            /** @description Returns the data of the comment schema */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CommentDto"];
                };
            };
            /** @description Returns an invalid message if there is an error in the request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvalidRequestErrorDto"];
                };
            };
            /** @description Returns an error if not using jwt or an invalid one */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenRequestErrorDto"];
                };
            };
        };
    };
    AuthController_logIn: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LogInBodyDto"];
            };
        };
        responses: {
            /** @description It returns an object with a token jwt property */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LogInResDto"];
                };
            };
            /** @description Returns messages describing the invalid fields of the request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LogInBadRequestDto"];
                };
            };
            /** @description Returns when invalid credentials are entered */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LogInUnauthorizedDto"];
                };
            };
        };
    };
    AuthController_signIn: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SignInBodyDto"];
            };
        };
        responses: {
            /** @description Returns the registered username and the status code */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SignInResDto"];
                };
            };
            /** @description Returns messages describing the invalid fields of the request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SignInBadRequestDto"];
                };
            };
            /** @description If username already exists, returns this error code */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SignInConflictResponseDto"];
                };
            };
        };
    };
    AccntController_getComments: {
        parameters: {
            query?: {
                /** @description The number of comments you wished returned. It must be a positive number, and if it exceeds the total amount of comments, it returns all of them */
                nmbOfCmmnts?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Returns the comments made by the user */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccntCommentsDto"][];
                };
            };
            /** @description If the request is invalid, it returns the error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvalidRequestErrorDto"];
                };
            };
            /** @description Returns an error if not using jwt or an invalid one */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenRequestErrorDto"];
                };
            };
        };
    };
    AccntController_getAccntPosts: {
        parameters: {
            query?: {
                /** @description The number of posts you wished returned. It must be a positive number, and if it exceeds the total amount of posts, it returns all of them */
                nmbOfPosts?: number;
                /** @description If present returns either only either published posts or non-published posts. Leave empty if you want all of them */
                published?: boolean;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Returns the posts of the user. The default value is 10. If a higher value is specified than the ones in the database, it returns the maximum amount of posts there is */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostDto"][];
                };
            };
            /** @description If the request is invalid, it returns the error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvalidRequestErrorDto"];
                };
            };
            /** @description Returns an error if not using jwt or an invalid one or if the user is not a poster */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenRequestErrorDto"];
                };
            };
        };
    };
    AccntController_createPost: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreatePostBodyDto"];
            };
        };
        responses: {
            /** @description Returns the created post */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostDto"];
                };
            };
            /** @description If the request is invalid, it returns the error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvalidRequestErrorDto"];
                };
            };
            /** @description Returns an error if not using jwt or an invalid one or if the user is not a poster */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenRequestErrorDto"];
                };
            };
        };
    };
    AccntController_getRole: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Returns the current role of the user */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UpgradeAccntRes"];
                };
            };
            /** @description Returns if the the user id in the jwt does not exist */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvalidRequestErrorDto"];
                };
            };
        };
    };
    AccntController_upgradeAccnt: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpgradeAccntBodyDto"];
            };
        };
        responses: {
            /** @description Returns the new role assigned to the account */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UpgradeAccntRes"];
                };
            };
            /** @description Returns an error if the user already has that role, it is not logged in or the passcode is incorrect */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenRequestErrorDto"];
                };
            };
        };
    };
    AccntController_updateComment: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                commentId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostCommentsDto"];
            };
        };
        responses: {
            /** @description Returns the data of the updated comment */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccntCommentsDto"];
                };
            };
            /** @description If the request is invalid, it returns the error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvalidRequestErrorDto"];
                };
            };
            /** @description Returns an error if not using jwt or an invalid one or if comment id does not belong to the user */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenRequestErrorDto"];
                };
            };
        };
    };
    AccntController_deleteComment: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                commentId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Returns a confirmation message alongside a 200 status code */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DeleteCommentRes"];
                };
            };
            /** @description If the request is invalid, it returns the error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvalidRequestErrorDto"];
                };
            };
            /** @description Returns an error if not using jwt or an invalid one or if comment id does not belong to the user */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenRequestErrorDto"];
                };
            };
        };
    };
    AccntController_updatePost: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                postId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreatePostBodyDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostDto"];
                };
            };
            /** @description Returns the updated post */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostDto"];
                };
            };
            /** @description If the request is invalid, it returns the error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvalidRequestErrorDto"];
                };
            };
            /** @description Returns an error if not using jwt or an invalid one or if the user is not a poster */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenRequestErrorDto"];
                };
            };
        };
    };
    AccntController_deletePost: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                postId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Returns the deleted post */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostDto"];
                };
            };
            /** @description If the request is invalid, it returns the error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InvalidRequestErrorDto"];
                };
            };
            /** @description Returns an error if not using jwt or an invalid one or if the user is not a poster */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ForbiddenRequestErrorDto"];
                };
            };
        };
    };
}
