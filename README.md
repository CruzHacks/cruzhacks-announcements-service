# cruzhacks-announcements-service
Twilio API serving announcements via SMS &amp; the live app. 

## Request Schema

```shell
curl --request POST \
  --url http://localhost:7071/api/announcements \
  --header 'authentication: API_KEY' \
  --header 'content-type: application/json' \
  --data '{
    "announcement": "Test: Announcement",
    "password": "Test Password",
    "twilio": boolean value
}'
```
  
The Twilio boolean indicates whether to send the announcement via Twilio. If set false, then the API will save the announcement to the database.