# node-red-contrib-sepa
## What does this package do?
This package makes a new node "SEPA" available in the node red palette.

## Input
The input accepts a message object with following attributes:
```json
{
  "tx": [
    
  ]
}
```

## Node attributes

* name: node name
* topic: message topic (overwritten by msg.topic)
* initname: initiators name
* initiban: initiators IBAN
* initbic: initiators BIC
* fileid: label for file
* msgid: label for message
* batchbooking: batch booking
* executiondate: requested execution date [YYYY-MM-DD]
* messagetype:

## Output

XML-file as a string in <code>msg.file</code>. Use the **file write node** to save the string into a file.
