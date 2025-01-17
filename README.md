# Workforce Dashboard

## Dependencies
To run the project in a local environment all that is needed is a current version of docker.

- Mac - https://docs.docker.com/desktop/mac/install/
- Windows - https://docs.docker.com/desktop/windows/install/

*Docker on windows requires further setup
1. Open Docker and go to settings -> Resources -> Proxies
2. Click manual proxy and configure
3. Set both Web Server (HTTP) and Secure Web Server (HTTPS) to ```http://bcpxy.nycnet:8080```
4. Update config file located under ```C:/Users/<username>/.docker/config.json```
Update the config file to the line below 
```{"credsStore":"desktop","proxies":{"default":{"httpProxy":"http://bcpxy.nycnet:8080","httpsProxy":"http://bcpxy.nycnet:8080"}}}```
5. If you receive the error below when running docker-compose up on windows, Open Docker -> Settings -> Docker Engine -> Change build kit from true to false click appy & restart 

   ```failed to solve with frontend dockerfile.v0```


## Local Development Setup
Clone the repo and switch to the stg branch

#### Config Files
1. Make a copy of ```local.example.py``` under ```/source/settings/``` rename it to ```local.py``` and add the database values under the comment #Real database when not testing. As shown below, replace <password> with the password from docker-compose.yml file
```
DATABASES = {
        'default': {
            "ENGINE": "django.db.backends.postgresql_psycopg2",
            "NAME": "wdp",
            "HOST": "localhost",
            "USER": "postgres",
            "PORT": 5432,
            "PASSWORD": "<password>",
    },
```

2. Make a copy of ```.env.example``` located under source/settings and rename it to ```.env``` 
3. Modify the database at the end of the DATABASE_URL to match the database name in the docker-compose.yml (wdp)

#### Docker Build & Compose
1. Run command ```docker-compose build```
2. Run command ```docker-compose up``` (this step will fail on first build, but is necessary) * DB needs to be created

#### DB Creation
Connect to dockerized Postgres container in a new terminal tab

1. ```docker container ls```
2. ```docker exec -it <psql-container-id> psql -U postgres```
3. ```postgres=# CREATE DATABASE wdp;```
4. ```postgres=# \password postgres```
5. ```change password to password from docker-compose.yml in prompt and confirm```
6. ```postgres=# \q or exit```
 
#### Export schema from current STG Postgres DB
**Method 1.** (Fast) pg_dump
1. Login to STG EC2 machine
2. Install postgres client ```sudo apt-get install postgresql-client```
2. Run the command below to create a dump file 
   
   ```pg_dump -Fc --host=<DB Host> --port=<DB Port> --username=<DB Username> --dbname=<DB Name> -f <WDP_mm_dd_yyyy>.sql -v```
   
3. Copy dump file to an encrypted share drive folder (Will be used in the step below (Initialize DB)
   
**Method 2.** (Slower) DBVisualizer
1. Right click the schema and click Export Schema
2. Select SQL for Output format and set path for Output destination
3. Select Tables

*You may want to deselect **common_metrics_marquee table** (This table has millions of records) - You can export a subset of the records as the whole table is not needed for development (Look at the section below - Export subset of table). 
  
Select Use Qualifier, leave the Qualifier as the default(public) and set the Delimiters as “ ”(double quotes)

*Note this is needed since there are some column names that use database keywords such as order and column which causes issues when creating tables

4.	Select Generate insert(Under Table SQL Options) and click export
5.	To decrease the size of the dump SQL file you can remove the records after the create table statement for django_admin_log (Seem to be log records)
 
Export subset of table (Common_metrics_marquee) 
1. To export a subset number of records from the common metrics marquee right click the table -> Export Table
2. Set File Output path
3. Set the Max Rows to the desired number of records you want to export EX- 10,000
4. Select Generate Create, Use Qualifier
5. Set Qualifier to public
6. Set Delimiter to " " (Double Quote) 
7. Click Export 
 
 
#### Initialize DB - Copy over db init script to dockerized psql
If using Windows open a CMD Prompt or PowerShell to location where you exported the schema

*Use Powershell if exported db init script is in a network location


1.	Copy the sql file to the docker container 
   
	```docker cp ./<WDP_mm_dd_yyyy.sql> <psql-container-id>:/WDP_mm_dd_yyyy.sql```
   
	*Replace <WDP_mm_dd_yyyy.sql> with name of sql file you exported from the steps above
   
2. If you used Method 1 (pg_dump) to export the schema run the command below
   
   ```docker exec <psql-container-id> pg_restore -U postgres -d wdp -c <WDP_mm_dd_yyyy>.sql -v```
   
*Note you can ignore errors you see in the script as the wdp role does not exist and metrics schema does not exist (Not neccessary for development)
   
3. If you used Method 2 (DBVisualizer) run the command below
   
	```docker exec -u postgres <psql-container-id> psql wdp postgres -f /WDP_mm_dd_yyyy.sql```

*To get psql-container-id run ```docker container ls```
   
	
1. Bring the container down with CTRL + c (In command prompt where you initially executed ```docker-compose up```)
2. Bring the container back up with ```docker-compose up```

view website at **localhost:8000**

## Import SQL Dump to PRD DB
1. Copy SQL dump file to PRD EC2 machine using Filezilla
2. Login to PRD EC2 machine
3. Install postgres client ```sudo apt-get install postgresql-client``` 
	
	*May get removed if instance is recycled, Future enhancement - should be added to terraform script so this step will not be neccessary 
	
4. Run the command below
	
	```pg_restore -d <DB Name> -h <DB Host> -p <DB_Port> -U <DB Username> -c <WDP_mm_dd_yyyy>.sql -v```


*Note the -c option will drop all the tables and recreate

	
## Maintenance Page
Library used for Maintenance Page

https://github.com/fabiocaccamo/django-maintenance-mode
   
#### Steps to enable/disable Maintenance Page
1. Login to Django CMS through ```/manage``` url (Must be Superuser to enable maintenance Mode)
2. Enable - Append application url with ```/maintenance-mode/on``` (should navigate to maintenance page)
3. Disable - Append application url with ```/maintenance-mode/off``` (should navigate to main page)

*The CMS admin page will still be accessible when the page is in maintenance mode

*The maintenance mode is set individually for the public and internal site
#   n y c o  
 