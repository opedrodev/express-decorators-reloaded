export function Delete(route: string): MethodDecorator {
    return (target, propertyKey, descriptor) => {
        const routes = Reflect.getMetadata('routes', target.constructor) || []
        routes.push({
            method: 'delete',
            route,
            handler: propertyKey
        })
        Reflect.defineMetadata('routes', routes, target.constructor)
    }
}