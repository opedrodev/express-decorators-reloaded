# Express Decorators Reloaded

`express-decorators-reloaded` provides a set of decorators to simplify API development with Express.js. This package helps you to define controllers, routes and middlewares in a clean and organized way using decorators.

## Installation
In order to start using this package, you must install it by running:
<br>
<br>
`npm install express-decorators-reloaded@latest`

## Features
**@Controller()**: Define controllers for handling routes.
<br>
**@Get(), @Post(), @Put(), @Patch(), @Delete()**: Define HTTP methods for your routes.
<br>
**@Middlewares()**: Add middleware functions for validation or other pre-route processing.
<br>
<br>
More features soon!

## Usage
### Setting up
#### 1. Enable Decorators in TypeScript
Ensure that your `tsconfig.json` includes the following settings:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

#### 2. Define Your Controllers and Routes
Create controllers using decorators to define routes and handlers.

```typescript
import { Controller, Get, Post, Middlewares } from 'express-decorators-reloaded';
import { Request, Response } from 'express';

// Example Middleware Function
function validateBody(req: Request, res: Response, next: Function) {
  if (!req.body.name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  next();
}

@Controller('/users')
export class UserController {
  @Get('/')
  async getUsers(req: Request, res: Response) {
    // Handle GET request
    res.send('Get all users');
  }

  @Post('/')
  @Middlewares([validateBody])
  async createUser(req: Request, res: Response) {
    // Handle POST request
    res.status(201).json({ message: 'User created', data: req.body });
  }
}
```

#### 3. Register Controllers
Register your controllers with the Express application.

```typescript
import express from 'express';
import { RegisterControllers } from 'express-decorators-reloaded';
import { UserController } from './UserController';

const app = express();
app.use(express.json());

// Register controllers
RegisterControllers(app, [UserController]);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## API
### Route Decorators
These decorators are used to define HTTP routes in your Express controllers. They function similarly but are designed for different HTTP methods.

#### @Controller(route: string)
Defines a controller with a base route.
- Parameters:
  * `route` - The base route for the controller (e.g., `/users`).

#### @Get(route: string), @Post(route: string), @Put(route: string), @Patch(route: string), @Delete(route: string)
Define routes for different HTTP methods. Each decorator corresponds to an HTTP method and can be used to specify the route path.

- Parameters:
  * `route` - The path to append to the base route defined by `@Controller()` (e.g., `/`, `/details`, `/update`).

#### Example Usage
```typescript
import { Controller, Get, Post, Put, Delete } from 'express-decorators-reloaded';

@Controller('/items')
export class ItemController {
  
  @Get('/')
  getItems(req: Request, res: Response) {
    // Handle GET request to /items
  }

  @Post('/')
  createItem(req: Request, res: Response) {
    // Handle POST request to /items
  }

  @Put('/:id')
  updateItem(req: Request, res: Response) {
    // Handle PUT request to /items/:id
  }

  @Patch('/:id')
  partialUpdateItem(req: Request, res: Response) {
    // Handle PATCH request to /items/:id
  }

  @Delete('/:id')
  deleteItem(req: Request, res: Response) {
    // Handle DELETE request to /items/:id
  }
}
```

#### @Middleware(middlewares: Array<Function>)
Adds middleware functions to a route or controller.

- Parameters:
  * `middlewares` - An array of middleware functions to apply.

#### Example Usage
```typescript
import { Controller, Post, Middlewares } from 'express-decorators-reloaded';
import { Request, Response } from 'express';

@Controller('/items')
export class ItemController {

  // Example Middleware Function
  function validateBody(req: Request, res: Response, next: Function) {
    if (!req.body.name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    next();
  }

  @Post('/')
  @Middlewares([validateBody])
  createItem(req: Request, res: Response) {
    // Handle POST request with access to req and res
  }
}
```

## Contributing
Contributions are welcome! Please feel free to open issues or submit pull requests.
