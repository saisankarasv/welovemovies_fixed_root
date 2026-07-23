# welovemovies
Post-Submission Reflection
Problem-Solving Approach

While building the WeLoveMovies backend, I started by reading through the project requirements and understanding the database schema, API routes, and expected response formats. I broke the project into smaller tasks instead of trying to implement everything at once.

I first configured the Express application, middleware, and routing structure. Next, I created the database migrations and verified that the tables and seed data were working correctly. After the database setup, I implemented each route individually, beginning with the simpler movie endpoints before moving on to the more complex theater and review endpoints that required joins and nested data.

Throughout development, I frequently tested each endpoint using the provided test suite and Postman. Whenever a test failed, I traced the issue back to the service layer or controller, corrected the query or response format, and reran the tests until the expected behavior matched the project requirements.

Key Technical Decision

One important technical decision I made was separating the application into routers, controllers, and service files instead of writing all of the logic inside the route handlers.

This separation made the project easier to maintain and debug. The controllers focused on handling requests and responses, while the service layer contained all database queries using Knex. If I needed to modify a query or reuse it in another endpoint, I could do so without changing the routing logic. Although it required creating more files initially, it resulted in a cleaner and more organized codebase.

AI Use Disclosure

Yes.

I used AI responsibly as a learning and productivity tool throughout the project. I primarily used it to clarify Express and Knex concepts, understand SQL joins, troubleshoot test failures, and explain error messages. I verified the generated suggestions against the project requirements and tested all changes locally before including them in the final solution. AI assisted my learning process, but I was responsible for understanding, integrating, and validating the implementation.

Area for Improvement

One area I would like to strengthen is writing more advanced SQL queries with Knex, particularly when working with multiple joins and transforming flat query results into nested JSON structures. While completing this project improved my understanding significantly, I would like to become more comfortable designing efficient database queries and optimizing backend performance for larger applications.

Ethical Use of AI in Backend Engineering

I believe AI is most valuable as an assistant rather than a replacement for engineering knowledge. In a professional backend development workflow, I would use AI to help explain unfamiliar concepts, look up framework documentation, generate boilerplate code, identify possible causes of bugs, and suggest refactoring ideas. I would always review, test, and validate any AI-generated code before using it in production to ensure it meets project requirements, follows coding standards, and maintains security and reliability.
