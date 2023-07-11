# Test Projects (Mail Client)

In this repo, there has two projects and db script for database. One is api project using .netcore (v3.1) and another one is frondend project using angular (v8.1.2). 
This repo may be purpose as a test project and process like a Mail Client. 

### My Experience

When I start touch & open these projects using vscode, I feel very complex and not standardize. And a little difficult to says which Architecture designs are using for respective projects. 

For api project (.netcore), I think it is using very simple MVC and only one seperated as "Services" layer. 
For data access, sometime using EFCore but some are using Raw sql query. Even I found Migrations files, but I'm not understand why added "Database" folder and manual sql script. But actually I like these two ways given as optional. Because this project is test project, right? and developer can using as they like.
- Should be bug free and runnable state before pass to developer to test
- At lease should be use "N Tier Architecture" design but I like to use "Clean Architecture"
- Should be use ORM (EFCore or other) for real live app
- Should be set standard rules for code


For frontend project (angular), I'm not out of date for angular code since too long not touch and no study. But I have complete to work pagination for Mail (Inbox). 
- I think no specific architecture apply in this angular project. Should be set one and more prefar "Modular Design" pattern
- Should be separate data models from api
- Others

> NOTE: I have not implement for frontend and backend improvements that my above suggested. Sorry for that.