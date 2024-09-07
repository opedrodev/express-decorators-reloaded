import { Request, Response, NextFunction } from "express"

type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void

export function Middlewares(middlewares: MiddlewareFunction[]): MethodDecorator {
    if (middlewares.length <= 0) {
        throw new Error("Middlewares array cannot be empty")
    }

    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata("middlewares", middlewares, target, propertyKey)
    }
}
