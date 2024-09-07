import "reflect-metadata"
import { Application, Request, Response, NextFunction } from "express"

type HttpMethod = "get" | "post" | "put" | "delete" | "patch"

export function Controller(baseRoute: string): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata("baseRoute", baseRoute, target)
    }
}

export function RegisterControllers(app: Application, controllers: any[]) {
    controllers.forEach((controller) => {
        const instance = new controller()
        const baseRoute = Reflect.getMetadata("baseRoute", controller)
        const routes = Reflect.getMetadata("routes", controller) || []

        routes.forEach((route: any) => {
            const middlewares: Function[] = Reflect.getMetadata("middlewares", controller.prototype, route.handler) || []

            const executeMiddlewares = (req: Request, res: Response, next: NextFunction) => {
                let index = 0

                const nextMiddleware = (err?: any) => {
                    if (err) {
                        return next(err)
                    }

                    if (index < middlewares.length) {
                        const middleware = middlewares[index++]

                        try {
                            middleware(req, res, nextMiddleware)
                        } catch (error) {
                            next(error)
                        }
                    } else {
                        const result = instance[route.handler](req, res)

                        if (result instanceof Promise) {
                            result.then((data) => {
                                if (!res.headersSent) {
                                    res.send(data)
                                }
                            }).catch(next)
                        } else {
                            if (!res.headersSent) {
                                res.send(result)
                            }
                        }
                    }
                }

                nextMiddleware()
            }

            app[route.method as HttpMethod](baseRoute + route.route, executeMiddlewares)
        })
    })
}
