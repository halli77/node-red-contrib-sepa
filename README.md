# node-red-contrib-sepa
## What does this package do?
This package provides a node "SEPA" that generates payment files.

## Input
The input accepts a message object with following attributes (values of the object are dummy values):
```json
{
  "topic":  "",
  "initname": "your name",
  "initiban": "DE00123456781234567890",
  "initbic": "MARKDEFFXXX",
  "messagetype": "pain.001.001.03",
  "msgid": "your message id",
  "batchbooking": true,
  "executiondate": "2021-11-11",
  "tx": [
    {
      "name": "your customers name",
      "iban": "your customers iban",
      "amount": 1.23,
      "purpose": "payment description, e.g. invoice-nr",
      "id": "end-to-end-id, customer reference"
    }, 
    {
      ...
    }
  ],
}
```

## Node attributes

* name: node name
* topic: message topic (overwritten by msg.topic)
* initname: initiators name
* initiban: initiators IBAN
* initbic: initiators BIC
* msgid: id for message/file
* batchbooking: batch booking
* executiondate: requested execution date [YYYY-MM-DD]
* messagetype: at the moment only pain.001.001.003 (SEPA credit transfer) is supported

An item in the message object with the same name overwrites the values given in the node attributes!

## Output

<code>msg.payload</code> contains a json-object representing the elements of the message. To . Use **XML node** to convert the json object into a xml string and afterwards the **file write node** to save the string into a file.
