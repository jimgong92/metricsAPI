#Metrics API
RESTful API to query metrics dataset with dynamic query strings. Requests are cached to speed up future identical queries.

##Example Usage
- (Instances) When did metric 167 have value greater than 500?
  e.g. 
  ```/api/167/instances/value>500```
- (Count) How often did metric 15 have value equal to 1?
  e.g. 
  ```/api/15/count/value=1```
- (Sum) How much value did metric 110 have on August 1st, 2014?
  e.g. 
  ```/api/110/sum/date=2014-08-01```
- (Average) On average, how much value did metric 110 have in March 2014?
  e.g. 
  ```/api/110/average/date>2015-03-01&date<2015-04-01```

##Development

###Installing Dependencies
- Install [Postgres.app](http://postgresapp.com/)
- Run Postgres.app
```
npm install
npm start
```

###Changing/Updating Data
To update the dataset for the API, replace the contents of metrics.csv with the updated content and restart the server. 

##API Components

- PostgreSQL
- Express
- Node.js
- Sequelize
- Redis