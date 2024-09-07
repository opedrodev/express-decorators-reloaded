import "reflect-metadata"

import { Application } from "express"

type HttpMethod = "get" | "post" | "put" | "delete" | "patch"

export function Controller(baseRoute: string): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata('baseRoute', baseRoute, target)
    }
}

export function RegisterControllers(app: Application, controllers: any[]) {
    controllers.forEach((controller) => {
        const instance = new controller()
        const baseRoute = Reflect.getMetadata('baseRoute', controller)
        const routes = Reflect.getMetadata('routes', controller) || []
    
        routes.forEach((route: any) => {
            app[route.method as HttpMethod](baseRoute + route.route, (req, res) => {
                const result = instance[route.handler](req, res)

                if (result instanceof Promise) {
                    return result.then((data) => res.send(data))
                }

                return res.send(result)
            })
        })
    })
}
  