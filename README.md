# expresjs-example

## About

Backend REST APIs to create a basic dashboard to search Git repos (built on Git API V3 )

More details coming soon. Till then some basic details about is happening on birds eye-view level.

## A word about design, architecture, frameworks used

#### Why Express.js in 2021?

With great new frameworks like Deno.JS, Next.js, I still think Express.JS is good enough for simple projects where one doesn't need a lot of ammunition. This also allows building the project as per the requirement and play around when requirements change.

#### Mostly just a few things were kept in mind while designing this:

- **Layered approach**: Layered approach helps to achieve `separation of concerns and thus make the code more readable, maintainable and can be evolved better. For example: In this API, there are two layers: 

    1. Routes + Controllers: These two are related to HTTP request/responses. Routes handle the requests and direct them to the appropriate controller. The controller takes the data, validate and then forward it to the services for further processing.

    2. Services + Data Access: These two are mainly related to business logic. Services get the data from the controller and it manipulates and process as per the business requirements. These are then passed to data access which talks to data warehouses and retrieves the data as services' requirement. Although to keep things simple, the current API version does not have a data access part.

    Each of these layers has its task and if in future, it will be less cumbersome for the developer to replace any underlying framework that a layer is using without disturbing others.

- **Ease of testing**: Quality is one of the most important things when it comes to delivering any software. This in turn also means that the developer should write code that is easy to test. For example, the unit testing of services is essentially testing the core logic minus the external disturbances (e.g. Network disturbances) which help to focus on one task and hence give better quality. 

- **Evolution**: Softwares are ever-evolving. There are always new business requirements, changed requirements, tech debts to be paid off, bugs to be fixed. Writing a tightly coupled big chunk of code can be anti-evolution. The code should be written in a manner where it completely solves the problem at hand right now while also have scope to be evolved to even maybe something completely different in future.

    For example, Express.JS passed the data received in HTTP requests in the `req` object to controllers. What if one later wants to use some other framework like Hapi.JS which uses the `request` object. For this, at the starting of the controller, there is a simple one-line added: ``` let { value, unit, precision } = req.query ```. So now, services don't need to know the `req`  or `request` object. The `Layered approach` helped here as well to make services completely independent of the framework which is handling HTTP logics.

    This is one of the many such small things which a developer can do to make their code evolution-friendly, maintainable.

There are more minute things and multiple examples in code that helps us to achieve the above points and even more. This small API doesn't confine to any particular design pattern or architecture(at least not known to me) but tries to take good parts and best practices from various resources and implements what I think is good for the problem at hand but also has the scope to evolve with time.

Please reach out to me for any suggestions or feedbacks by raising issues.
