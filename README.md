# https://medium.com/@KuldipkumarPrajapati

## Upload Admin
### node ./utils/uploadAdmin.js

## Upload 2 million users
### node ./utils/massusers.js

## kafka

### cd C:\kafka && .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
### cd C:\kafka && .\bin\windows\kafka-server-start.bat .\config\server.properties
### cd C:\kafka && .\bin\windows\kafka-topics.bat --create --topic userTopic --bootstrap-server localhost:9092
### cd C:\kafka && .\bin\windows\kafka-topics.bat --bootstrap-server=localhost:9092 --list
### cd C:\kafka && .\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic userTopic  
###      --from-beginning

## Docker
### docker-compose --version
### docker-compose up
### docker --version

## Posgres
### net start postgresql-x64-15
### cd C:\Program Files\PostgreSQL\15\bin && pg_ctl

## Machine Learning
### conda activate flask_api
### (flask_api) PS C:\projects\ml> python .\train_model.py
### (flask_api) PS C:\projects\ml> python api.py