# node-red-contrib-sepa
![npm](https://img.shields.io/npm/v/node-red-contrib-sepa)

[Node-RED](https://nodered.org/)-nodes that generates [SEPA](https://en.wikipedia.org/wiki/Single_Euro_Payments_Area) payment files.


# SEPA Credit Transfer
A credit transfer sends money from the initator (debitor) to on or more recipients (creditors). 

The input accepts a message object with following attributes (values of the object are dummy values):

```json
{ messagetype: "pain.001.001.03",
  messageid: "my msg id",
  initname: "John Doe - Debitor",
  initiban: "DE12500105170648489890",
  initbic: "INGDDEFF",
  batchbooking: true,
  executiondate: "2021-12-15",
  tx: [
    {
        name: "Creditor 1",
        iban: "AT483200000012345864",
        amount: 1.11,
        purpose: "purpose 1",
        id: "id 1"
    },
    {
        name: "Creditor 2",
        iban: "CH5604835012345678009",
        amount: 2.22,
        purpose: "purpose 2",
        id: "id 2"
    }
    ]
}
```

If `tx.id` is empty, an ISO-timestamp is used instead.

A corresponding item in the message object overwrites the value given in the node attributes.

![Example flow](./img/sepa_sct_flow.png)


# SEPA Direct Debit
A direct debit requests money from one ore more payers. The creditor initiates the payment. The creditor needs a creditor id.

The input accepts a message object with following attributes (values of the object are dummy values):

```json
{ messagetype: "pain.008.001.02",
  messageid: "my msg id",
  initname: "John Doe - Creditor",
  initiban: "DE12500105170648489890",
  initbic: "INGDDEFF",
  batchbooking: true,
  executiondate: "2021-12-15",
  creditorid: "DE98ZZZ09999999999",
  localinstrument: "CORE",
  sequencetype: "RCUR",
  tx: [
    {
        "name": "Debitor 1",
        "iban": "AT483200000012345864",
        "amount": 1.11,
        "purpose": "purpose 1",
        "mdtid": "mandate 1",
        "mdtdate": "2021-01-01",
        "id": "e2eid 1"
    },
    {
        "name": "Debitor 2",
        "iban": "CH5604835012345678009",
        "amount": 2.22,
        "purpose": "purpose 2",
        "mdtid": "mandate 2",
        "mdtdate": "2021-02-02",
        "id": "e2eid 2"
    }   
]
}
```

If `tx.id` is empty, an ISO-timestamp is used instead.

A corresponding item in the message object overwrites the value given in the node attributes!

![Example flow](./img/sepa_sdd_flow.png)

# Output
`msg.payload` contains a xml-string representing the SEPA-payment file. Use the **write file**-node to save as a xml-file.


# Example flows (copy & paste to your Node-RED editor)


```json
[{"id":"f74895fa02c284ef","type":"group","z":"a48e0948ab3f8228","name":"","style":{"label":true,"fill":"#bfdbef"},"nodes":["b9b2b8ee0223ba8d","b7edd1e9c5af78ed","a0d38c6dc8767af8","da28507cf249fcdc"],"env":[],"x":294,"y":79,"w":692,"h":142},{"id":"b9b2b8ee0223ba8d","type":"inject","z":"a48e0948ab3f8228","g":"f74895fa02c284ef","name":"full msg object","props":[{"p":"topic","vt":"str"},{"p":"messagetype","v":"pain.001.001.03","vt":"str"},{"p":"messageid","v":"my msg id","vt":"str"},{"p":"initname","v":"John Doe - Debitor","vt":"str"},{"p":"initiban","v":"DE12500105170648489890","vt":"str"},{"p":"initbic","v":"INGDDEFF","vt":"str"},{"p":"batchbooking","v":"true","vt":"bool"},{"p":"executiondate","v":"2021-12-15","vt":"str"},{"p":"tx","v":"[{\"name\":\"Creditor 1\",\"iban\":\"AT483200000012345864\",\"amount\":1.11,\"purpose\":\"purpose 1\",\"id\":\"id 1\"},{\"name\":\"Creditor 2\",\"iban\":\"CH5604835012345678009\",\"amount\":2.22,\"purpose\":\"purpose 2\",\"id\":\"id 2\"}]","vt":"json"},{"p":"createddatetime","v":"2021-12-05T09:04:35.586Z","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"topicFromMessage","x":420,"y":180,"wires":[["a0d38c6dc8767af8"]]},{"id":"b7edd1e9c5af78ed","type":"debug","z":"a48e0948ab3f8228","g":"f74895fa02c284ef","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":890,"y":180,"wires":[]},{"id":"a0d38c6dc8767af8","type":"sepa-sct","z":"a48e0948ab3f8228","g":"f74895fa02c284ef","name":"","topic":"","initname":"","initiban":"","initbic":"","messagetype":"pain.001.001.03","messageid":"","batchbooking":"true","executiondate":"","x":680,"y":180,"wires":[["b7edd1e9c5af78ed"]]},{"id":"da28507cf249fcdc","type":"comment","z":"a48e0948ab3f8228","g":"f74895fa02c284ef","name":"SEPA Credit Transfer Demo","info":"","x":440,"y":120,"wires":[]},{"id":"093b4abce34146b1","type":"group","z":"a48e0948ab3f8228","name":"","style":{"fill":"#bfdbef","label":true},"nodes":["0ce9dd25119c3049","5a9be6af3b611c27","8c5c541ebdd1ab1d","0a3bf7731097c9ca"],"env":[],"x":294,"y":259,"w":692,"h":142},{"id":"0ce9dd25119c3049","type":"sepa-sdd","z":"a48e0948ab3f8228","g":"093b4abce34146b1","name":"","topic":"","initname":"","initiban":"","initbic":"","fileid":"","messagetype":"pain.008.001.02","messageid":"","batchbooking":"true","executiondate":"","creditorid":"","localinstrument":"CORE","sequencetype":"RCUR","x":670,"y":360,"wires":[["5a9be6af3b611c27"]]},{"id":"5a9be6af3b611c27","type":"debug","z":"a48e0948ab3f8228","g":"093b4abce34146b1","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":890,"y":360,"wires":[]},{"id":"8c5c541ebdd1ab1d","type":"comment","z":"a48e0948ab3f8228","g":"093b4abce34146b1","name":"SEPA Direct Debit Demo","info":"","x":430,"y":300,"wires":[]},{"id":"0a3bf7731097c9ca","type":"inject","z":"a48e0948ab3f8228","g":"093b4abce34146b1","name":"full msg object","props":[{"p":"topic","vt":"str"},{"p":"messagetype","v":"pain.008.001.02","vt":"str"},{"p":"messageid","v":"my msg id","vt":"str"},{"p":"initname","v":"John Doe - Creditor","vt":"str"},{"p":"initiban","v":"DE12500105170648489890","vt":"str"},{"p":"initbic","v":"INGDDEFF","vt":"str"},{"p":"batchbooking","v":"true","vt":"bool"},{"p":"executiondate","v":"2021-12-15","vt":"str"},{"p":"tx","v":"[{\"name\":\"Debitor 1\",\"iban\":\"AT483200000012345864\",\"amount\":1.11,\"purpose\":\"purpose 1\",\"mdtid\":\"mandate 1\",\"mdtdate\":\"2021-01-01\",\"id\":\"e2eid 1\"},{\"name\":\"Debitor 2\",\"iban\":\"CH5604835012345678009\",\"amount\":2.22,\"purpose\":\"purpose 2\",\"mdtid\":\"mandate 2\",\"mdtdate\":\"2021-02-02\",\"id\":\"e2eid 2\"}]","vt":"json"},{"p":"createddatetime","v":"2021-12-05T09:04:35.586Z","vt":"str"},{"p":"creditorid","v":"DE98ZZZ09999999999","vt":"str"},{"p":"localinstrument","v":"CORE","vt":"str"},{"p":"sequencetype","v":"RCUR","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"topicFromMessage","x":420,"y":360,"wires":[["0ce9dd25119c3049"]]}]
```