# expresjs-example

## About

This is a simple HTTP API that can convert temperature from Celsius to Fahrenheit or vice-versa. The result is given up to 2 decimal places by default but can be changed as per the user's requirement.


## Pre-requisite
- Node.JS

## Steps to install and run:
1. Unzip the folder expressjs-example
2. Open up a terminal and go to the folder you unzipped in step 1
3. Run `npm install`. This will install all necessary packages.
4. Create a file called ".env" inside this folder and copy-paste the following lines to it:

        NODE_ENV=development
        PORT=3000
    The value of `PORT` can be changed to any number where you want the server to be listening.
5. Execute the following command to start the server:

        npm run dev
    This will start the server to listen at the `127.0.0.1:PORT` and you will see a message similar to this:

    ![Server-start](/images/server-start.png)

6. Open up another terminal and use the curl command to check if the setup is proper:

        curl "http://localhost:3000/v1"
    The response of this should be 200 OK and a `Hello World!` message.

Now you are all set to convert temperature from Celsius to Fahrenheit or vice-versa.

*You can also run test using command:*

    npm run test

The unit tests are written using Jest framework.
## API documentation

### Temperature
The temperature right now has just one functionality: to convert temperature from one unit of measurement to another unit measurement.

All the temperature resources will have the base URL:

``` http://localhost:3000/v1 ```

### Convert Temperature
```/temperature/convert```

Convert the temperature from Celsius to Fahrenheit or vice-versa. The result is given up to 2 decimal places by default but can be changed as per the user's requirement.

Parameter | Description | Data Type | Mandatory
--------- | ----------- | --------- | ---------
value | The numerical value of temperature to be converted. | Number | Yes
unit | The unit of measurement of temperature from which is to be converted. Currently supported: Celsius(C) and Fahrenheit(F). | String | Yes
precision | The number of decimal places to be present in the output. By default the value is set to be 2. | Integer | No

#### Returns:

Returns an object containing `value` (string) in the other unit of measurement and other `unit` (string) of measurement as well.
Follows the format:
```json
{
 "unit": string,
 "value": string
}
```

Examples:

Request

```
> curl "http://localhost:3000/v1/temperature/convert?value=12.13&unit=f&precision=6"                  
```
Response
```json
{
 "unit":"C",
 "value":"-11.038889"
}
```

Request

```
> curl "http://localhost:3000/v1/temperature/convert?value=12.13&unit=c"                 
```
Response
```json
{
 "unit":"F",
 "value":"53.83"
}
```

#### Error message details:

Message | Description
--- | ---
UNIT NOT FOUND | The valid input for `unit` param can only be either `C` for Celsius and `F` for Fahrenheit. Anything other than this throws this error. See the data object to get more detail.
INVALID VALUE | Only numerical(whole, decimal, positive, negative) input is allowed for this param. Usually comes up when a string or empty string is passed to this param. See the data object to get more detail.

Example:

Request

```
> curl "http://localhost:3000/v1/temperature/convert?value=12.13&unit=fc"                 
```
Response
```json
{
 "error":"UNIT NOT FOUND",
 "data":{"unit":"FC"}
}
```
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
