If you just want to try OYDID locally, start a Docker container with the following command:
```console
docker run -d --name did_repo -e DID_DB=local -p 3000:3000 oydeu/oydid-base
```

Check if the repository is up and running by showing the *Repository Status* page at http://localhost:3000

You can create a new DID with the following `curl` statement (using the Uniregistrar API endpoint):
```console
echo '{"didDocument": {"test": "my first DID"}, 
       "options": {"location":"http://localhost:3000"}}' | \
curl -H "Content-Type: application/json" -d @- -X POST http://localhost:3000/1.0/create
```

As a result you will see a JSON document that starts with:
```json
{
  "didState":{
    "did":"did:oyd:zQmXaUXEZBYXkNgYd4WEzisw1RGfsCyAVk91QssvsVc4jwM%40http://localhost:3000",
    "state":"finished" 
    ...
```

Resolve the DID to get the original DID document (using the Uniresolver API endpoint and replacing the DID with the response from above):
```console
curl http://localhost:3000/1.0/identifiers/did%3Aoyd%3AzQmXaUXEZBYXkNgYd4WEzisw1RGfsCyAVk91QssvsVc4jwM%40http%3A%2F%2Flocalhost%3A3000
```

Clean up your environment by removing the Docker container:
```console
docker rm -f did_repo
```
***Important note:*** As soon as you end the `did_repo` container all DIDs and associated information are lost since it is stored in a Sqlite3 database inside the container.