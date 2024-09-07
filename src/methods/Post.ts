export function Post(route: string): MethodDecorator {
    return (target, propertyKey, descriptor) => {
        const routes = Reflect.getMetadata('routes', target.constructor) || []
        routes.push({
            method: 'post',
            route,
            handler: propertyKey
        })
        Reflect.defineMetadata('routes', routes, target.constructor)
    }
}